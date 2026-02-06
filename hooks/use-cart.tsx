'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { CartItem, Product } from '@/lib/types';

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, type: 'file' | 'print') => void;
  updateQuantity: (productId: string, type: 'file' | 'print', quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  shipping: number;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('cart');
    if (stored) {
      try {
        setItems(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse cart from localStorage', e);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('cart', JSON.stringify(items));
    }
  }, [items, mounted]);

  const addItem = (item: CartItem) => {
    setItems(prev => {
      const existing = prev.find(
        i => i.product.id === item.product.id && i.type === item.type
      );

      if (existing) {
        return prev.map(i =>
          i.product.id === item.product.id && i.type === item.type
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }

      return [...prev, item];
    });
  };

  const removeItem = (productId: string, type: 'file' | 'print') => {
    setItems(prev => prev.filter(
      item => !(item.product.id === productId && item.type === type)
    ));
  };

  const updateQuantity = (productId: string, type: 'file' | 'print', quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId, type);
      return;
    }

    setItems(prev => prev.map(item =>
      item.product.id === productId && item.type === type
        ? { ...item, quantity }
        : item
    ));
  };

  const clearCart = () => {
    setItems([]);
  };

  // Calculate totals
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = items.reduce((sum, item) => {
    const price = item.type === 'file'
      ? item.product.filePrice || 0
      : item.product.printBasePrice || 0;
    return sum + price * item.quantity;
  }, 0);

  // Shipping: 30,000 VND flat rate for physical items
  const hasPhysicalItems = items.some(item => item.type === 'print');
  const shipping = hasPhysicalItems ? 30000 : 0;

  const total = subtotal + shipping;

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        shipping,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
