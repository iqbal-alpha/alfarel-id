import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { onRequest, onRequestPost } from '../../functions/api/chat.js';

function makeRequest(url, { method = 'POST', body, headers = {} } = {}) {
  const init = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers
    }
  };
  if (body !== undefined) {
    init.body = typeof body === 'string' ? body : JSON.stringify(body);
  }
  return new Request(url, init);
}

describe('Cloudflare Pages Function /api/chat', () => {
  const originalFetch = globalThis.fetch;

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it('returns 405 for non-POST HTTP methods via onRequest', async () => {
    const res = await onRequest({
      request: makeRequest('https://alfarel-id.pages.dev/api/chat', { method: 'GET' }),
      env: {}
    });
    expect(res.status).toBe(405);
  });

  it('returns 403 for cross-origin requests not on allowlist', async () => {
    const res = await onRequestPost({
      request: makeRequest('https://alfarel-id.pages.dev/api/chat', {
        headers: { Origin: 'https://evil-site.example' },
        body: { message: 'hello' }
      }),
      env: { GEMINI_API_KEY: 'gem-key' }
    });
    expect(res.status).toBe(403);
  });

  it('returns 400 for empty or oversized payloads without calling upstream AI', async () => {
    const fetchSpy = vi.fn();
    globalThis.fetch = fetchSpy;

    const emptyRes = await onRequestPost({
      request: makeRequest('https://alfarel-id.pages.dev/api/chat', {
        headers: { Origin: 'https://alfarel-id.pages.dev' },
        body: { message: '   ' }
      }),
      env: { GEMINI_API_KEY: 'gem-key' }
    });
    expect(emptyRes.status).toBe(400);

    const hugeRes = await onRequestPost({
      request: makeRequest('https://alfarel-id.pages.dev/api/chat', {
        headers: { Origin: 'https://alfarel-id.pages.dev' },
        body: JSON.stringify({ message: 'hi', padding: 'x'.repeat(17000) })
      }),
      env: { GEMINI_API_KEY: 'gem-key' }
    });
    expect(hugeRes.status).toBe(400);

    const badJsonRes = await onRequestPost({
      request: makeRequest('https://alfarel-id.pages.dev/api/chat', {
        headers: { Origin: 'https://alfarel-id.pages.dev' },
        body: '{bad json'
      }),
      env: { GEMINI_API_KEY: 'gem-key' }
    });
    expect(badJsonRes.status).toBe(400);

    const over400Res = await onRequestPost({
      request: makeRequest('https://alfarel-id.pages.dev/api/chat', {
        headers: { Origin: 'https://alfarel-id.pages.dev' },
        body: { message: 'a'.repeat(401) }
      }),
      env: { GEMINI_API_KEY: 'gem-key' }
    });
    expect(over400Res.status).toBe(400);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('fetches live Supabase catalog, calls Gemini Flash-Lite securely, and filters hallucinated IDs', async () => {
    const calls = [];
    globalThis.fetch = vi.fn(async (url, opts) => {
      const urlStr = String(url);
      calls.push({ url: urlStr, opts });

      if (urlStr.includes('/rest/v1/alfarel_products')) {
        return new Response(JSON.stringify([
          {
            id: 'uuid-bali-01',
            title_en: 'Bali Breeze Linen Shirt',
            price: 189000,
            available_sizes: ['M', 'L'],
            available_colors: ['Sand Beige'],
            stock_status: 'ready',
            is_active: true,
            alfarel_categories: { slug: 'shirts' }
          }
        ]), { status: 200, headers: { 'Content-Type': 'application/json' } });
      }

      if (urlStr.includes('/rest/v1/alfarel_store_settings')) {
        return new Response(JSON.stringify([
          {
            store_name: 'AlfaREL.ID Store',
            whatsapp_number: '628111222333',
            announcement_en: 'FREE STICKERS',
            is_store_open: true
          }
        ]), { status: 200, headers: { 'Content-Type': 'application/json' } });
      }

      if (urlStr.includes('generativelanguage.googleapis.com')) {
        return new Response(JSON.stringify({
          candidates: [{
            content: {
              parts: [{
                text: JSON.stringify({
                  reply: 'Bali Breeze Linen Shirt is ready in size L!',
                  productIds: ['uuid-bali-01', 'hallucinated-999'],
                  suggestWhatsApp: false
                })
              }]
            }
          }]
        }), { status: 200, headers: { 'Content-Type': 'application/json' } });
      }

      return new Response('Not found', { status: 404 });
    });

    const res = await onRequestPost({
      request: makeRequest('https://alfarel-id.pages.dev/api/chat', {
        headers: { Origin: 'https://alfarel-id.pages.dev' },
        body: { message: 'Is Bali Breeze ready in L?', history: [] }
      }),
      env: {
        GEMINI_API_KEY: 'secret-gem-key',
        VITE_SUPABASE_URL: 'https://proj.supabase.co',
        VITE_SUPABASE_ANON_KEY: 'anon-key'
      }
    });

    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.provider).toBe('gemini');
    expect(data.reply).toContain('Bali Breeze Linen Shirt');
    expect(data.productIds).toEqual(['uuid-bali-01']);
    expect(data.suggestWhatsApp).toBe(false);

    // Ensure key passed via header, NOT query string, payload uses JSON schema, and zero access to order_logs/admin_auth
    const geminiCall = calls.find((c) => c.url.includes('generativelanguage.googleapis.com'));
    expect(geminiCall.url).not.toContain('secret-gem-key');
    expect(geminiCall.opts.headers['x-goog-api-key']).toBe('secret-gem-key');
    const geminiBody = JSON.parse(geminiCall.opts.body);
    expect(geminiBody.system_instruction?.parts?.[0]?.text).toContain('Bali Breeze Linen Shirt');
    expect(geminiBody.generationConfig?.responseMimeType).toBe('application/json');
    expect(geminiBody.generationConfig?.responseSchema?.required).toEqual(['reply', 'productIds', 'suggestWhatsApp']);
    expect(calls.some((c) => c.url.includes('alfarel_order_logs') || c.url.includes('alfarel_admin_auth'))).toBe(false);
  });

  it('falls back to OpenRouter :free array when Gemini returns 429 or 500 and OPENROUTER_API_KEY is set', async () => {
    const orCalls = [];
    globalThis.fetch = vi.fn(async (url, opts) => {
      const urlStr = String(url);
      if (urlStr.includes('generativelanguage.googleapis.com')) {
        return new Response(JSON.stringify({ error: { message: 'Quota exceeded' } }), { status: 429 });
      }
      if (urlStr.includes('openrouter.ai/api/v1/chat/completions')) {
        orCalls.push(opts);
        return new Response(JSON.stringify({
          choices: [{
            message: {
              content: JSON.stringify({
                reply: 'Yes, Canggu Retro Boardshort is ready!',
                productIds: ['prod-04'],
                suggestWhatsApp: false
              })
            }
          }]
        }), { status: 200, headers: { 'Content-Type': 'application/json' } });
      }
      return new Response('{}', { status: 404 });
    });

    const res = await onRequestPost({
      request: makeRequest('https://alfarel-id.pages.dev/api/chat', {
        headers: { Origin: 'https://alfarel-id.pages.dev' },
        body: { message: 'Boardshorts ready?' }
      }),
      env: {
        GEMINI_API_KEY: 'gem-key',
        OPENROUTER_API_KEY: 'or-key'
      }
    });

    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.provider).toBe('openrouter');
    expect(data.productIds).toEqual(['prod-04']);
    expect(orCalls).toHaveLength(1);
    expect(orCalls[0].headers.Authorization).toBe('Bearer or-key');
    const orBody = JSON.parse(orCalls[0].body);
    expect(Array.isArray(orBody.models)).toBe(true);
    expect(orBody.models.every((id) => id.endsWith(':free') || id === 'openrouter/free')).toBe(true);
  });

  it('returns 429 or 503 with suggestWhatsApp: true and whatsappNumber when AI providers fail or keys missing', async () => {
    const noKeyRes = await onRequestPost({
      request: makeRequest('https://alfarel-id.pages.dev/api/chat', {
        headers: { Origin: 'https://alfarel-id.pages.dev' },
        body: { message: 'Hello?' }
      }),
      env: {}
    });
    expect(noKeyRes.status).toBe(503);
    const noKeyData = await noKeyRes.json();
    expect(noKeyData.suggestWhatsApp).toBe(true);
    expect(noKeyData.whatsappNumber).toBeTruthy();

    globalThis.fetch = vi.fn(async () => new Response('Rate limited', { status: 429 }));
    const limitRes = await onRequestPost({
      request: makeRequest('https://alfarel-id.pages.dev/api/chat', {
        headers: { Origin: 'https://alfarel-id.pages.dev' },
        body: { message: 'Hello?' }
      }),
      env: { GEMINI_API_KEY: 'gem-key' }
    });
    expect(limitRes.status).toBe(429);
    const limitData = await limitRes.json();
    expect(limitData.suggestWhatsApp).toBe(true);
  });

  it('enforces per-IP soft rate limit via Cloudflare Cache API when threshold is reached', async () => {
    const originalCaches = globalThis.caches;
    globalThis.caches = {
      default: {
        match: vi.fn(async () => new Response('10')),
        put: vi.fn(async () => {})
      }
    };

    try {
      const res = await onRequestPost({
        request: makeRequest('https://alfarel-id.pages.dev/api/chat', {
          headers: {
            Origin: 'https://alfarel-id.pages.dev',
            'CF-Connecting-IP': '203.0.113.5'
          },
          body: { message: 'Spam check' }
        }),
        env: { GEMINI_API_KEY: 'gem-key' }
      });

      expect(res.status).toBe(429);
      const data = await res.json();
      expect(data.error).toBe('RATE_LIMIT');
      expect(data.suggestWhatsApp).toBe(true);
    } finally {
      globalThis.caches = originalCaches;
    }
  });

  it('falls back to mock catalog without writing failed responses into edge cache when Supabase REST returns 500', async () => {
    const originalCaches = globalThis.caches;
    const putSpy = vi.fn(async () => {});
    globalThis.caches = {
      default: {
        match: vi.fn(async () => undefined),
        put: putSpy
      }
    };

    try {
      globalThis.fetch = vi.fn(async (url) => {
        const urlStr = String(url);
        if (urlStr.includes('/rest/v1/')) {
          return new Response('DB Error', { status: 500 });
        }
        if (urlStr.includes('generativelanguage.googleapis.com')) {
          return new Response(JSON.stringify({
            candidates: [{
              content: {
                parts: [{
                  text: JSON.stringify({
                    reply: 'Fallback catalog works: Bali Breeze Camp Collar Linen Shirt is available.',
                    productIds: ['prod-01'],
                    suggestWhatsApp: false
                  })
                }]
              }
            }]
          }), { status: 200 });
        }
        return new Response('{}', { status: 404 });
      });

      const res = await onRequestPost({
        request: makeRequest('https://alfarel-id.pages.dev/api/chat', {
          headers: { Origin: 'https://alfarel-id.pages.dev' },
          body: { message: 'Any linen shirts?' }
        }),
        env: {
          GEMINI_API_KEY: 'gem-key',
          VITE_SUPABASE_URL: 'https://proj.supabase.co',
          VITE_SUPABASE_ANON_KEY: 'anon-key'
        }
      });

      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.productIds).toEqual(['prod-01']);
      const catalogCached = putSpy.mock.calls.some(([req]) => String(req.url).includes('catalog-cache.internal'));
      expect(catalogCached).toBe(false);
    } finally {
      globalThis.caches = originalCaches;
    }
  });
});
