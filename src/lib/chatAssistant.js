import { formatPriceIDR } from './whatsapp.js';

export const MAX_MESSAGE_LENGTH = 400;
export const MAX_HISTORY_MESSAGES = 8;
export const MAX_HISTORY_CONTENT_LENGTH = 600;
export const MAX_SUGGESTED_PRODUCTS = 4;

export const DEFAULT_GEMINI_MODEL = 'gemini-3.5-flash-lite';
export const OPENROUTER_FREE_MODELS = [
  'meta-llama/llama-3.3-70b-instruct:free',
  'google/gemma-3-27b-it:free',
  'openrouter/free'
];

export const SHIPPING_RATES_INFO = [
  'Greater Jakarta (Jabodetabek): IDR 10,000',
  'Java Island (Outside Jakarta): IDR 18,000',
  'Outside Java Island: IDR 30,000'
];

export const COURIER_OPTIONS = [
  'J&T Express',
  'JNE Reguler',
  'SiCepat Ekspres',
  'GoSend / Grab Instant'
];

/**
 * Remove ASCII control characters while keeping normal tabs and newlines.
 */
function stripControlChars(value) {
  return String(value).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').trim();
}

/**
 * Normalize either mockProducts (camelCase) or Supabase row (snake_case) into one shape.
 */
export function normalizeCatalogProduct(item) {
  if (!item || typeof item !== 'object') return null;
  if (item.id === undefined || item.id === null || !String(item.id).trim()) return null;
  const isActive = item.isActive !== undefined ? Boolean(item.isActive) : item.is_active !== false;
  if (!isActive) return null;

  return {
    id: String(item.id).trim(),
    category: item.alfarel_categories?.slug || item.category || 'apparel',
    title: item.title_en || item.title_id || 'Coastal Apparel Item',
    description: item.description_en || item.description_id || '',
    material: item.material_en || item.material_id || '',
    price: Number(item.price || 0),
    compareAtPrice: item.compareAtPrice ?? item.compare_at_price ?? null,
    sizes: Array.isArray(item.sizes) ? item.sizes : (Array.isArray(item.available_sizes) ? item.available_sizes : []),
    colors: Array.isArray(item.colors) ? item.colors : (Array.isArray(item.available_colors) ? item.available_colors : []),
    stockStatus: item.stockStatus || item.stock_status || 'ready'
  };
}

/**
 * Validate incoming /api/chat payload and clamp history length & message size.
 */
export function validateAndNormalizeChatInput(payload) {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    return { ok: false, error: 'Invalid request payload.' };
  }

  if (typeof payload.message !== 'string') {
    return { ok: false, error: 'Message must be a non-empty string.' };
  }

  const cleanMessage = stripControlChars(payload.message);
  if (!cleanMessage) {
    return { ok: false, error: 'Message cannot be empty.' };
  }
  if (cleanMessage.length > MAX_MESSAGE_LENGTH) {
    return { ok: false, error: `Message exceeds ${MAX_MESSAGE_LENGTH} characters.` };
  }

  const rawHistory = Array.isArray(payload.history) ? payload.history : [];
  const normalizedHistory = rawHistory
    .filter((entry) => entry && (entry.role === 'user' || entry.role === 'assistant') && typeof entry.content === 'string')
    .map((entry) => ({
      role: entry.role,
      content: stripControlChars(entry.content).slice(0, MAX_HISTORY_CONTENT_LENGTH)
    }))
    .filter((entry) => entry.content.length > 0)
    .slice(-MAX_HISTORY_MESSAGES);

  const lang = payload.lang === 'id' ? 'id' : 'en';

  return {
    ok: true,
    message: cleanMessage,
    history: normalizedHistory,
    lang
  };
}

/**
 * Build a concise, token-efficient summary of active public products for the AI system prompt.
 */
export function summarizeCatalogForPrompt(products = []) {
  const activeItems = (Array.isArray(products) ? products : [])
    .map(normalizeCatalogProduct)
    .filter(Boolean);

  if (activeItems.length === 0) {
    return 'No active products currently available in catalog.';
  }

  return activeItems
    .map((p) => {
      const priceText = `IDR ${formatPriceIDR(p.price)}`;
      const promoText = p.compareAtPrice && Number(p.compareAtPrice) > p.price
        ? ` (Promo from IDR ${formatPriceIDR(p.compareAtPrice)})`
        : '';
      const sizesText = p.sizes.length ? p.sizes.join(', ') : 'One Size';
      const colorsText = p.colors.length ? p.colors.join(', ') : 'Standard';
      const matText = p.material ? ` | Material: ${p.material}` : '';
      const descText = p.description ? ` | Info: ${p.description.slice(0, 140)}` : '';
      return `- [${p.id}] ${p.title} | Cat: ${p.category} | Price: ${priceText}${promoText} | Stock: ${p.stockStatus} | Sizes: ${sizesText} | Colors: ${colorsText}${matText}${descText}`;
    })
    .join('\n');
}

/**
 * Construct the grounded system instruction combining live catalog, shipping rules, and strict guardrails.
 */
export function buildSystemPrompt({ products = [], storeSettings = {}, lang = 'en' } = {}) {
  const storeName = storeSettings?.storeName || storeSettings?.store_name || 'AlfaREL.ID Store';
  const isStoreOpen = storeSettings?.isStoreOpen !== false && storeSettings?.is_store_open !== false;
  const announcement = lang === 'id'
    ? (storeSettings?.announcement_id || storeSettings?.announcement_en || storeSettings?.announcementEn || '')
    : (storeSettings?.announcement_en || storeSettings?.announcementEn || storeSettings?.announcement_id || '');
  const catalogText = summarizeCatalogForPrompt(products);

  const storeStatusLine = isStoreOpen
    ? 'Store status: OPEN for orders via WhatsApp Checkout.'
    : 'Store status: Orders are temporarily paused (inform customers they can still browse products and reach WhatsApp admin for inquiries).';

  return `You are the AI Coastal Concierge & Style Assistant for ${storeName} ("Wear The Vacation Feeling").

STORE INFORMATION:
- ${storeStatusLine}
- Default Storefront Language: ${lang === 'id' ? 'Indonesian' : 'English'}
${announcement ? `- Active Store Announcement: ${announcement}\n` : ''}- Ordering Flow: Zero-login Shopping Bag + 1-click WhatsApp Fast Checkout (Bank Transfer / QRIS confirmation via WhatsApp admin).
- Flat Shipping Zones: ${SHIPPING_RATES_INFO.join(' | ')}.
- Available Couriers: ${COURIER_OPTIONS.join(', ')}.

LIVE PRODUCT CATALOG (ACTIVE SKUS ONLY):
${catalogText}

STRICT RULES:
1. Respond in the same language as the buyer's latest message (Indonesian or English), with a warm, helpful, concise coastal boutique tone.
2. ONLY state products, IDs, prices (IDR), sizes, colors, materials, and stock statuses ('ready', 'low_stock', 'pre_order', 'sold_out') found in the LIVE PRODUCT CATALOG above. Never invent products, discounts, or customer reviews.
3. If a buyer asks about an unavailable size/product, custom bulk order, or anything outside the catalog facts, answer honestly and set "suggestWhatsApp": true.
4. Never ask for or collect personal sensitive data (full address, phone number, passwords, payment details) inside this chat—direct them to Shopping Bag -> WhatsApp Checkout.
5. Keep replies concise (2-4 sentences max) and refuse off-topic requests politely in 1 sentence.

OUTPUT FORMAT (STRICT JSON ONLY):
Return ONLY valid JSON matching:
{"reply": "string", "productIds": ["matching-id"], "suggestWhatsApp": false}`;
}

/**
 * Parse LLM output (raw JSON, fenced JSON, prose-prefixed JSON, or plain text fallback) and discard invalid product IDs.
 */
export function parseAndSanitizeAssistantOutput(rawText, validProductIds = []) {
  const validSet = new Set((Array.isArray(validProductIds) ? validProductIds : []).map(String));
  const fallbackReply = 'Please check our catalog or reach out to our WhatsApp admin for instant assistance.';

  if (typeof rawText !== 'string' || !rawText.trim()) {
    return { reply: fallbackReply, productIds: [], suggestWhatsApp: true };
  }

  let candidateText = rawText.trim();
  const fenceMatch = candidateText.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fenceMatch && fenceMatch[1]) {
    candidateText = fenceMatch[1].trim();
  }

  const jsonCandidates = [candidateText];
  const firstBrace = candidateText.indexOf('{');
  const lastBrace = candidateText.lastIndexOf('}');
  if (firstBrace !== -1 && lastBrace > firstBrace) {
    jsonCandidates.push(candidateText.slice(firstBrace, lastBrace + 1));
  }

  for (const snippet of jsonCandidates) {
    try {
      const parsed = JSON.parse(snippet);
      if (parsed && typeof parsed === 'object' && typeof parsed.reply === 'string') {
        const cleanReply = stripControlChars(parsed.reply) || fallbackReply;
        const rawIds = Array.isArray(parsed.productIds) ? parsed.productIds : [];
        const uniqueValidIds = [];
        for (const id of rawIds) {
          const strId = String(id);
          if (validSet.has(strId) && !uniqueValidIds.includes(strId)) {
            uniqueValidIds.push(strId);
          }
          if (uniqueValidIds.length >= MAX_SUGGESTED_PRODUCTS) break;
        }

        return {
          reply: cleanReply,
          productIds: uniqueValidIds,
          suggestWhatsApp: Boolean(parsed.suggestWhatsApp)
        };
      }
    } catch {
      // Try next candidate
    }
  }

  return {
    reply: stripControlChars(rawText) || fallbackReply,
    productIds: [],
    suggestWhatsApp: false
  };
}
