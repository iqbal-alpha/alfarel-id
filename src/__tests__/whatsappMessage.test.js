import { describe, it, expect } from 'vitest';
import {
  sanitizeText,
  generateOrderId,
  formatPriceIDR,
  compileWhatsAppOrderMessage,
  buildWhatsAppUrl
} from '../lib/whatsapp';

describe('WhatsApp Utilities', () => {
  it('sanitizes special characters that would break WhatsApp formatting', () => {
    expect(sanitizeText('Arya *Pratama* _Bold_')).toBe('Arya Pratama Bold');
    expect(sanitizeText('   Trimmed    spaces   ')).toBe('Trimmed spaces');
    expect(sanitizeText(null)).toBe('');
  });

  it('generates high entropy order IDs matching pattern', () => {
    const id1 = generateOrderId();
    const id2 = generateOrderId();
    expect(id1).toMatch(/^ALF-\d{8}-\d{6}$/);
    expect(id2).toMatch(/^ALF-\d{8}-\d{6}$/);
    expect(id1).not.toBe(id2);
  });

  it('formats numbers to comma-separated IDR integers', () => {
    expect(formatPriceIDR(189000)).toBe('189,000');
    expect(formatPriceIDR(0)).toBe('0');
  });

  it('compiles full WhatsApp message template correctly', () => {
    const msg = compileWhatsAppOrderMessage({
      orderId: 'ALF-20261013-123456',
      items: [
        {
          title_en: 'Bali Breeze Linen Shirt',
          size: 'L',
          color: 'Ocean Navy',
          price: 189000,
          quantity: 2
        }
      ],
      subtotal: 378000,
      shippingCost: 10000,
      shippingZoneLabel: 'Greater Jakarta',
      customerName: 'Arya Pratama',
      customerPhone: '081234567890',
      deliveryAddress: 'Jl. Sunset Road No. 8',
      city: 'Denpasar',
      courier: 'J&T Express',
      specialNotes: 'Please wrap carefully'
    });

    expect(msg).toContain('*NEW ORDER — ALFAREL.ID*');
    expect(msg).toContain('Order ID: #ALF-20261013-123456');
    expect(msg).toContain('Bali Breeze Linen Shirt (Ocean Navy)');
    expect(msg).toContain('Qty: 2 pcs @ IDR 189,000 = IDR 378,000');
    expect(msg).toContain('Subtotal: IDR 378,000');
    expect(msg).toContain('Shipping (Greater Jakarta): IDR 10,000');
    expect(msg).toContain('*TOTAL AMOUNT: IDR 388,000*');
    expect(msg).toContain('Arya Pratama');
  });

  it('normalizes local 08 phone numbers to international 62 format in wa.me URL', () => {
    const url = buildWhatsAppUrl('081234567890', 'Hello');
    expect(url).toContain('https://wa.me/6281234567890?text=Hello');

    const url2 = buildWhatsAppUrl('628987654321', 'Test');
    expect(url2).toContain('https://wa.me/628987654321?text=Test');
  });
});
