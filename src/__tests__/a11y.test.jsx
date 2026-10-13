import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { ProductDetailModal } from '../components/ProductDetailModal';
import { CartProvider } from '../context/CartContext';
import { LanguageProvider } from '../i18n/LanguageContext';
import { ProductCard } from '../components/ProductCard';

describe('Accessibility & Keyboard Navigation (WCAG AA)', () => {
  const dummyProduct = {
    id: 'prod-01',
    title_en: 'Bali Breeze Linen Shirt',
    title_id: 'Kemeja Linen Bali Breeze',
    category: 'shirts',
    price: 189000,
    images: ['/images/products/bali-breeze-shirt.jpg'],
    sizes: ['S', 'M', 'L'],
    colors: ['White', 'Navy'],
    stockStatus: 'ready',
    isActive: true
  };

  it('ProductDetailModal renders with role="dialog", aria-modal="true", and closes on Escape', () => {
    const handleClose = vi.fn();
    render(
      <LanguageProvider>
        <CartProvider>
          <ProductDetailModal product={dummyProduct} onClose={handleClose} />
        </CartProvider>
      </LanguageProvider>
    );

    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveAttribute('aria-modal', 'true');

    // Press Escape key
    fireEvent.keyDown(window, { key: 'Escape', code: 'Escape' });
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('ProductCard is keyboard accessible via Enter or Space key', () => {
    const handleSelect = vi.fn();
    render(
      <LanguageProvider>
        <CartProvider>
          <ProductCard product={dummyProduct} onSelectProduct={handleSelect} />
        </CartProvider>
      </LanguageProvider>
    );

    // Card should be interactive
    const card = screen.getByRole('article');
    expect(card).toBeInTheDocument();

    // Trigger keydown Enter
    fireEvent.keyDown(card, { key: 'Enter', code: 'Enter' });
    expect(handleSelect).toHaveBeenCalledWith(dummyProduct);
  });
});
