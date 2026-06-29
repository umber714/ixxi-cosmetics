'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { Product, ProductVariant } from '@/data/products';

export interface CartItem {
  product: Product;
  variant?: ProductVariant;
  quantity: number;
}

export function cartLineId(item: CartItem): string {
  return item.variant?.id ?? item.product.id;
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  addItem: (product: Product, variant?: ProductVariant) => void;
  removeItem: (lineId: string) => void;
  updateQuantity: (lineId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addItem = (product: Product, variant?: ProductVariant) => {
    const lineId = variant?.id ?? product.id;
    setItems(prev => {
      const existing = prev.find(item => cartLineId(item) === lineId);
      if (existing) {
        return prev.map(item =>
          cartLineId(item) === lineId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, variant, quantity: 1 }];
    });
    setIsOpen(true);
  };

  const removeItem = (lineId: string) => {
    setItems(prev => prev.filter(item => cartLineId(item) !== lineId));
  };

  const updateQuantity = (lineId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(lineId);
      return;
    }
    setItems(prev =>
      prev.map(item =>
        cartLineId(item) === lineId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + (item.variant?.price ?? item.product.price) * item.quantity,
    0
  );

  return (
    <CartContext.Provider value={{ items, isOpen, setIsOpen, addItem, removeItem, updateQuantity, clearCart, totalItems, subtotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
}
