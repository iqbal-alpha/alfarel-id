import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { ChatWidget } from '../components/ChatWidget';
import { CartProvider } from '../context/CartContext';
import { LanguageProvider } from '../i18n/LanguageContext';

describe('ChatWidget AI Coastal Concierge', () => {
  const originalFetch = globalThis.fetch;

  const sampleProducts = [
    {
      id: 'prod-01',
      category: 'shirts',
      title_en: 'Bali Breeze Camp Collar Linen Shirt',
      title_id: 'Bali Breeze Camp Collar Linen Shirt',
      price: 189000,
      compareAtPrice: 229000,
      images: ['/images/products/bali-breeze-shirt.jpg'],
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Sand Beige'],
      stockStatus: 'ready',
      isActive: true
    }
  ];

  const sampleSettings = {
    storeName: 'AlfaREL.ID Store',
    whatsappNumber: '6281234567890',
    isStoreOpen: true
  };

  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it('renders bottom-left accessible launcher and toggles dialog with Escape key', () => {
    render(
      <LanguageProvider>
        <CartProvider>
          <ChatWidget
            products={sampleProducts}
            storeSettings={sampleSettings}
            onSelectProduct={vi.fn()}
          />
        </CartProvider>
      </LanguageProvider>
    );

    const launcher = screen.getByRole('button', { name: /stylist|concierge|ask/i });
    expect(launcher).toBeInTheDocument();

    fireEvent.click(launcher);
    const dialog = screen.getByRole('dialog', { name: /AlfaREL/i });
    expect(dialog).toBeInTheDocument();
    expect(screen.getByText(/Breezy linen shirts\?/i)).toBeInTheDocument();

    fireEvent.keyDown(window, { key: 'Escape', code: 'Escape' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    // Focus must return to mounted launcher button after closing dialog
    const restoredLauncher = screen.getByRole('button', { name: /stylist|concierge|ask/i });
    expect(document.activeElement).toBe(restoredLauncher);
  });

  it('submits user prompt to /api/chat and renders interactive product cards', async () => {
    const onSelectProduct = vi.fn();
    globalThis.fetch = vi.fn(async () => new Response(JSON.stringify({
      reply: 'We have Bali Breeze Camp Collar Linen Shirt ready in S to XL!',
      productIds: ['prod-01'],
      suggestWhatsApp: false,
      provider: 'gemini'
    }), { status: 200, headers: { 'Content-Type': 'application/json' } }));

    render(
      <LanguageProvider>
        <CartProvider>
          <ChatWidget
            products={sampleProducts}
            storeSettings={sampleSettings}
            onSelectProduct={onSelectProduct}
          />
        </CartProvider>
      </LanguageProvider>
    );

    fireEvent.click(screen.getByRole('button', { name: /stylist|concierge|ask/i }));

    const input = screen.getByPlaceholderText(/Ask about linen|Tanya stok/i);
    fireEvent.change(input, { target: { value: 'Any ready linen shirts?' } });
    fireEvent.submit(input.closest('form'));

    await waitFor(() => {
      expect(screen.getByText(/We have Bali Breeze Camp Collar Linen Shirt ready/i)).toBeInTheDocument();
    });

    expect(globalThis.fetch).toHaveBeenCalledWith(
      '/api/chat',
      expect.objectContaining({ method: 'POST' })
    );

    // Click View Detail on suggested product card
    const viewBtn = screen.getByRole('button', { name: /View Bali Breeze Camp Collar Linen Shirt/i });
    fireEvent.click(viewBtn);
    expect(onSelectProduct).toHaveBeenCalledWith(sampleProducts[0]);
  });

  it('preserves live storeSettings WhatsApp number on 429 fallback, enforces cooldown, and excludes error bubbles from API history', async () => {
    const fetchBodies = [];
    globalThis.fetch = vi.fn(async (_url, opts) => {
      fetchBodies.push(JSON.parse(opts.body));
      if (fetchBodies.length === 1) {
        return new Response(JSON.stringify({
          error: 'RATE_LIMIT',
          suggestWhatsApp: true,
          whatsappNumber: '6289999999999'
        }), { status: 429, headers: { 'Content-Type': 'application/json' } });
      }
      return new Response(JSON.stringify({
        reply: 'Recovered reply!',
        productIds: [],
        suggestWhatsApp: false,
        provider: 'gemini'
      }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    });

    render(
      <LanguageProvider>
        <CartProvider>
          <ChatWidget
            products={sampleProducts}
            storeSettings={{ ...sampleSettings, whatsappNumber: '6281234567890' }}
            onSelectProduct={vi.fn()}
          />
        </CartProvider>
      </LanguageProvider>
    );

    fireEvent.click(screen.getByRole('button', { name: /stylist|concierge|ask/i }));
    fireEvent.click(screen.getByText(/Breezy linen shirts\?/i));

    await waitFor(() => {
      const waLink = screen.getByRole('link', { name: /WhatsApp/i });
      expect(waLink).toBeInTheDocument();
      // Live storeSettings whatsappNumber must NOT be overwritten by 429 fallback number
      expect(waLink.getAttribute('href')).toContain('https://wa.me/6281234567890');
    });

    // Immediate rapid submit during cooldown should be blocked
    const input = screen.getByPlaceholderText(/Ask about linen|Tanya stok/i);
    fireEvent.change(input, { target: { value: 'Too fast!' } });
    fireEvent.submit(input.closest('form'));
    expect(fetchBodies).toHaveLength(1);

    // Wait for 1.5s cooldown to expire cleanly inside act(), then submit again
    await act(async () => {
      await new Promise((r) => setTimeout(r, 1600));
    });
    fireEvent.submit(input.closest('form'));

    await waitFor(() => {
      expect(fetchBodies).toHaveLength(2);
    });
    // Synthetic error bubble from turn 1 must NOT leak into subsequent turn history
    expect(fetchBodies[1].history.some((h) => /temporarily busy/i.test(h.content))).toBe(false);
  });

  it('adds suggested product to bag, shows paused store notice, and resets conversation', async () => {
    globalThis.fetch = vi.fn(async () => new Response(JSON.stringify({
      reply: 'Here is our linen shirt!',
      productIds: ['prod-01'],
      suggestWhatsApp: false,
      provider: 'gemini'
    }), { status: 200, headers: { 'Content-Type': 'application/json' } }));

    render(
      <LanguageProvider>
        <CartProvider>
          <ChatWidget
            products={sampleProducts}
            storeSettings={{ ...sampleSettings, isStoreOpen: false }}
            onSelectProduct={vi.fn()}
          />
        </CartProvider>
      </LanguageProvider>
    );

    fireEvent.click(screen.getByRole('button', { name: /stylist|concierge|ask/i }));
    expect(screen.getByText(/Orders are temporarily paused/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/Breezy linen shirts\?/i));

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Add Bali Breeze Camp Collar Linen Shirt to bag/i })).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: /Add Bali Breeze Camp Collar Linen Shirt to bag/i }));
    const storedCart = JSON.parse(localStorage.getItem('alfarel_cart_v1') || '[]');
    expect(storedCart).toHaveLength(1);
    expect(storedCart[0].productId).toBe('prod-01');

    fireEvent.click(screen.getByRole('button', { name: /Reset conversation/i }));
    expect(screen.queryByText(/Here is our linen shirt!/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Breezy linen shirts\?/i)).toBeInTheDocument();
  });
});
