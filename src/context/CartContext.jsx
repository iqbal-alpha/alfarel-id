import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    try {
      const stored = localStorage.getItem('alfarel_cart_v1');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [orderNote, setOrderNote] = useState(() => {
    try {
      return localStorage.getItem('alfarel_cart_note_v1') || '';
    } catch {
      return '';
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('alfarel_cart_v1', JSON.stringify(items));
    } catch (e) {
      console.warn('Unable to persist cart items', e);
    }
  }, [items]);

  useEffect(() => {
    try {
      localStorage.setItem('alfarel_cart_note_v1', orderNote);
    } catch (e) {
      console.warn('Unable to persist cart note', e);
    }
  }, [orderNote]);

  const addToCart = (product, size, color = '', quantity = 1) => {
    const chosenSize = size || (product.sizes && product.sizes[0]) || 'All Size';
    const chosenColor = color || (product.colors && product.colors[0]) || '';
    const cartItemId = `${product.id}-${chosenSize}-${chosenColor}`.replace(/\s+/g, '_');

    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prevItems,
          {
            cartItemId,
            productId: product.id,
            title_id: product.title_id,
            title_en: product.title_en,
            price: product.price,
            image: product.images[0],
            size: chosenSize,
            color: chosenColor,
            quantity: Math.max(1, quantity)
          }
        ];
      }
    });

    setIsCartOpen(true);
  };

  const updateQuantity = (cartItemId, delta) => {
    setItems((prevItems) => {
      return prevItems
        .map((item) => {
          if (item.cartItemId === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  const removeFromCart = (cartItemId) => {
    setItems((prevItems) => prevItems.filter((item) => item.cartItemId !== cartItemId));
  };

  const clearCart = () => {
    setItems([]);
    setOrderNote('');
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        totalItems,
        subtotal,
        orderNote,
        setOrderNote,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
