import {
  DEFAULT_GEMINI_MODEL,
  OPENROUTER_FREE_MODELS,
  validateAndNormalizeChatInput,
  normalizeCatalogProduct,
  buildSystemPrompt,
  parseAndSanitizeAssistantOutput
} from '../../src/lib/chatAssistant.js';
import { initialProducts, initialStoreSettings } from '../../src/data/mockProducts.js';

const MAX_BODY_BYTES = 16384;
const UPSTREAM_TIMEOUT_MS = 10000;
const RATE_LIMIT_WINDOW_SEC = 60;
const RATE_LIMIT_MAX_REQUESTS = 10;

function jsonResponse(payload, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      ...extraHeaders
    }
  });
}

function isOriginAllowed(request, env = {}) {
  const origin = request.headers.get('Origin');
  if (!origin) return true;
  const requestOrigin = new URL(request.url).origin;
  if (origin === requestOrigin) return true;
  const extraAllowed = String(env.ALLOWED_ORIGINS || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  return extraAllowed.includes(origin);
}

/**
 * Soft per-IP rate guard backed by Cloudflare Cache API when running in Workers runtime.
 */
async function checkRateLimit(request) {
  try {
    if (typeof caches === 'undefined' || !caches?.default) {
      return { allowed: true };
    }
    const ip = request.headers.get('CF-Connecting-IP') || 'anonymous';
    const cacheKey = new Request(`https://rate-limit.internal/chat/${encodeURIComponent(ip)}`);
    const cached = await caches.default.match(cacheKey);
    const currentCount = cached ? Number(await cached.text()) || 0 : 0;

    if (currentCount >= RATE_LIMIT_MAX_REQUESTS) {
      return { allowed: false };
    }

    const nextResp = new Response(String(currentCount + 1), {
      headers: {
        'Cache-Control': `public, max-age=${RATE_LIMIT_WINDOW_SEC}`
      }
    });
    await caches.default.put(cacheKey, nextResp);
    return { allowed: true };
  } catch {
    return { allowed: true };
  }
}

/**
 * Fetch active public catalog and store settings from Supabase REST API with 60s edge cache.
 */
async function fetchLiveStoreData(env = {}) {
  const supabaseUrl = (env.SUPABASE_URL || env.VITE_SUPABASE_URL || '').replace(/\/+$/, '');
  const supabaseAnonKey = env.SUPABASE_ANON_KEY || env.VITE_SUPABASE_ANON_KEY || '';

  if (!supabaseUrl || !supabaseAnonKey || supabaseUrl === 'https://your-project.supabase.co') {
    return { products: initialProducts, storeSettings: initialStoreSettings };
  }

  const cacheKey = new Request(`https://catalog-cache.internal/v1/store?u=${encodeURIComponent(supabaseUrl)}`);
  try {
    if (typeof caches !== 'undefined' && caches?.default) {
      const cached = await caches.default.match(cacheKey);
      if (cached) {
        return await cached.json();
      }
    }
  } catch {
    // Proceed without cache
  }

  const headers = {
    apikey: supabaseAnonKey,
    Authorization: `Bearer ${supabaseAnonKey}`,
    Accept: 'application/json'
  };

  try {
    const productColumns = [
      'id',
      'slug',
      'title_id',
      'title_en',
      'description_id',
      'description_en',
      'material_id',
      'material_en',
      'price',
      'compare_at_price',
      'available_sizes',
      'available_colors',
      'stock_status',
      'is_active',
      'alfarel_categories(slug,name_en)'
    ].join(',');

    const settingsColumns = 'store_name,whatsapp_number,announcement_id,announcement_en,is_store_open';

    const [prodRes, settingsRes] = await Promise.all([
      fetchWithTimeout(`${supabaseUrl}/rest/v1/alfarel_products?is_active=eq.true&select=${encodeURIComponent(productColumns)}&order=sort_order.asc`, { headers }, 5000),
      fetchWithTimeout(`${supabaseUrl}/rest/v1/alfarel_store_settings?id=eq.1&select=${encodeURIComponent(settingsColumns)}`, { headers }, 5000)
    ]);

    const rawProducts = prodRes.ok ? await prodRes.json() : null;
    const rawSettings = settingsRes.ok ? await settingsRes.json() : null;

    const result = {
      products: Array.isArray(rawProducts) && rawProducts.length > 0 ? rawProducts : initialProducts,
      storeSettings: Array.isArray(rawSettings) && rawSettings[0] ? rawSettings[0] : initialStoreSettings
    };

    if (prodRes.ok && settingsRes.ok) {
      try {
        if (typeof caches !== 'undefined' && caches?.default) {
          await caches.default.put(
            cacheKey,
            new Response(JSON.stringify(result), {
              headers: { 'Cache-Control': 'public, max-age=60', 'Content-Type': 'application/json' }
            })
          );
        }
      } catch {
        // Cache write best-effort
      }
    }

    return result;
  } catch {
    return { products: initialProducts, storeSettings: initialStoreSettings };
  }
}

async function fetchWithTimeout(url, options, timeoutMs = UPSTREAM_TIMEOUT_MS) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

async function callGeminiFlashLite({ apiKey, model, systemPrompt, history, message }) {
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`;

  const contents = [
    ...history.map((turn) => ({
      role: turn.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: turn.content }]
    })),
    {
      role: 'user',
      parts: [{ text: message }]
    }
  ];

  const response = await fetchWithTimeout(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-goog-api-key': apiKey
    },
    body: JSON.stringify({
      system_instruction: { parts: [{ text: systemPrompt }] },
      contents,
      generationConfig: {
        temperature: 0.4,
        maxOutputTokens: 450,
        responseMimeType: 'application/json',
        responseSchema: {
          type: 'OBJECT',
          properties: {
            reply: { type: 'STRING' },
            productIds: { type: 'ARRAY', items: { type: 'STRING' } },
            suggestWhatsApp: { type: 'BOOLEAN' }
          },
          required: ['reply', 'productIds', 'suggestWhatsApp']
        }
      }
    })
  });

  if (!response.ok) {
    return { ok: false, status: response.status };
  }

  const data = await response.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
  return { ok: Boolean(text), status: response.status, text };
}

async function callOpenRouterFree({ apiKey, origin, systemPrompt, history, message }) {
  const response = await fetchWithTimeout('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
      'HTTP-Referer': origin,
      'X-Title': 'AlfaREL.ID AI Coastal Concierge'
    },
    body: JSON.stringify({
      models: OPENROUTER_FREE_MODELS,
      messages: [
        { role: 'system', content: systemPrompt },
        ...history,
        { role: 'user', content: message }
      ],
      temperature: 0.4,
      max_tokens: 450
    })
  });

  if (!response.ok) {
    return { ok: false, status: response.status };
  }

  const data = await response.json();
  const text = data?.choices?.[0]?.message?.content || '';
  return { ok: Boolean(text), status: response.status, text };
}

export async function onRequestPost(context) {
  const { request, env = {} } = context;

  if (!isOriginAllowed(request, env)) {
    return jsonResponse({ error: 'Origin not allowed.' }, 403);
  }

  const rateResult = await checkRateLimit(request);
  if (!rateResult.allowed) {
    return jsonResponse(
      {
        error: 'RATE_LIMIT',
        suggestWhatsApp: true,
        whatsappNumber: env.VITE_STORE_WHATSAPP || initialStoreSettings.whatsappNumber
      },
      429
    );
  }

  let rawBody;
  try {
    rawBody = await request.text();
  } catch {
    return jsonResponse({ error: 'Invalid request body.' }, 400);
  }

  if (!rawBody || new TextEncoder().encode(rawBody).length > MAX_BODY_BYTES) {
    return jsonResponse({ error: 'Payload empty or exceeds 16 KB limit.' }, 400);
  }

  let parsedPayload;
  try {
    parsedPayload = JSON.parse(rawBody);
  } catch {
    return jsonResponse({ error: 'Malformed JSON body.' }, 400);
  }

  const validation = validateAndNormalizeChatInput(parsedPayload);
  if (!validation.ok) {
    return jsonResponse({ error: validation.error }, 400);
  }

  const { products, storeSettings } = await fetchLiveStoreData(env);
  const whatsappNumber =
    storeSettings?.whatsapp_number ||
    storeSettings?.whatsappNumber ||
    env.VITE_STORE_WHATSAPP ||
    initialStoreSettings.whatsappNumber;

  const geminiKey = env.GEMINI_API_KEY || '';
  const openRouterKey = env.OPENROUTER_API_KEY || '';

  if (!geminiKey && !openRouterKey) {
    return jsonResponse(
      {
        error: 'AI_UNAVAILABLE',
        suggestWhatsApp: true,
        whatsappNumber
      },
      503
    );
  }

  const validProductIds = products
    .map(normalizeCatalogProduct)
    .filter(Boolean)
    .map((p) => p.id);

  const systemPrompt = buildSystemPrompt({ products, storeSettings, lang: validation.lang });
  const geminiModel = env.GEMINI_MODEL || DEFAULT_GEMINI_MODEL;
  const origin = new URL(request.url).origin;

  let lastStatus = 503;

  if (geminiKey) {
    try {
      const geminiRes = await callGeminiFlashLite({
        apiKey: geminiKey,
        model: geminiModel,
        systemPrompt,
        history: validation.history,
        message: validation.message
      });

      if (geminiRes.ok) {
        const sanitized = parseAndSanitizeAssistantOutput(geminiRes.text, validProductIds);
        return jsonResponse({ ...sanitized, provider: 'gemini' }, 200);
      }
      lastStatus = geminiRes.status || 503;
    } catch {
      lastStatus = 503;
    }
  }

  if (openRouterKey) {
    try {
      const orRes = await callOpenRouterFree({
        apiKey: openRouterKey,
        origin,
        systemPrompt,
        history: validation.history,
        message: validation.message
      });

      if (orRes.ok) {
        const sanitized = parseAndSanitizeAssistantOutput(orRes.text, validProductIds);
        return jsonResponse({ ...sanitized, provider: 'openrouter' }, 200);
      }
      lastStatus = orRes.status || lastStatus;
    } catch {
      lastStatus = 503;
    }
  }

  const failureStatus = lastStatus === 429 ? 429 : 503;
  return jsonResponse(
    {
      error: failureStatus === 429 ? 'RATE_LIMIT' : 'AI_UNAVAILABLE',
      suggestWhatsApp: true,
      whatsappNumber
    },
    failureStatus
  );
}

export async function onRequest(context) {
  if (context.request.method === 'POST') {
    return onRequestPost(context);
  }
  return jsonResponse({ error: 'Method Not Allowed' }, 405, { Allow: 'POST' });
}
