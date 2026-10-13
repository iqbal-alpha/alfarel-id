import { describe, it, expect, beforeEach } from 'vitest';
import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { CartProvider, useCart } from '../context/CartContext';

describe('CartContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const wrapper = ({ children }) => <CartProvider>{children}</CartProvider>;

  it('initializes with empty cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    expect(result.current.items).toEqual([]);
    expect(result.current.totalItems).toBe(0);
    expect(result.current.subtotal).toBe(0);
  });

  it('adds a new product to cart correctly', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    const product = {
      id: 'prod-01',
      title_en: 'Bali Breeze Linen Shirt',
      title_id: 'Kemeja Linen Bali Breeze',
      price: 189000,
      images: ['/images/products/bali-breeze-shirt.jpg'],
      sizes: ['M', 'L']
    };

    act(() => {
      result.current.addToCart(product, 'L', 'Ocean Navy', 1);
    });

    expect(result.current.items.length).toBe(1);
    expect(result.current.items[0].quantity).toBe(1);
    expect(result.current.items[0].size).toBe('L');
    expect(result.current.totalItems).toBe(1);
    expect(result.current.subtotal).toBe(189000);
  });

  it('increments quantity immutably without mutating previous state objects', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    const product = {
      id: 'prod-01',
      title_en: 'Bali Breeze Linen Shirt',
      price: 189000,
      images: ['/images/products/bali-breeze-shirt.jpg']
    };

    act(() => {
      result.current.addToCart(product, 'L', 'Ocean Navy', 1);
    });

    const firstItemRef = result.current.items[0];

    act(() => {
      result.current.addToCart(product, 'L', 'Ocean Navy', 1);
    });

    expect(result.current.items[0].quantity).toBe(2);
    expect(result.current.totalItems).toBe(2);
    // Verifying immutability: the updated object should not be identical by reference
    expect(result.current.items[0]).not.toBe(firstItemRef);
  });

  it('updates note and persists to storage', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.setOrderNote('Please gift wrap carefully');
    });

    expect(result.current.orderNote).toBe('Please gift wrap carefully');
  });

  it('clears cart completely', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    const product = { id: 'prod-01', price: 100000, images: [''] };

    act(() => {
      result.current.addToCart(product, 'M', '', 2);
      result.current.setOrderNote('Test note');
    });

    expect(result.current.items.length).toBe(1);

    act(() => {
      result.current.clearCart();
    });

    expect(result.current.items).toEqual([]);
    expect(result.current.orderNote).toBe('');
    expect(result.current.totalItems).toBe(0);
  });
});
