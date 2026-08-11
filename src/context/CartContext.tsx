"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getProductById } from "@/lib/products";
import { calculateCartPricing } from "@/lib/pricing";
import { cartItemKey } from "@/lib/utils";
import type { CartItem, CartLine, Product, Size } from "@/types";

interface CartContextValue {
  items: CartItem[];
  lines: CartLine[];
  itemCount: number;
  subtotal: number;
  teeDiscount: number;
  teeCount: number;
  addItem: (product: Product, size: Size, quantity?: number) => void;
  removeItem: (productId: string, size: Size) => void;
  updateQuantity: (productId: string, size: Size, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "staunch-cart";

function loadCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setItems(loadCart());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const addItem = useCallback(
    (product: Product, size: Size, quantity = 1) => {
      setItems((current) => {
        const existing = current.find(
          (item) =>
            item.productId === product.id && item.size === size,
        );
        if (existing) {
          return current.map((item) =>
            item.productId === product.id && item.size === size
              ? { ...item, quantity: item.quantity + quantity }
              : item,
          );
        }
        return [...current, { productId: product.id, size, quantity }];
      });
    },
    [],
  );

  const removeItem = useCallback((productId: string, size: Size) => {
    setItems((current) =>
      current.filter(
        (item) => !(item.productId === productId && item.size === size),
      ),
    );
  }, []);

  const updateQuantity = useCallback(
    (productId: string, size: Size, quantity: number) => {
      if (quantity <= 0) {
        removeItem(productId, size);
        return;
      }
      setItems((current) =>
        current.map((item) =>
          item.productId === productId && item.size === size
            ? { ...item, quantity }
            : item,
        ),
      );
    },
    [removeItem],
  );

  const clearCart = useCallback(() => setItems([]), []);

  const lines = useMemo<CartLine[]>(() => {
    return items
      .map((item) => {
        const product = getProductById(item.productId);
        if (!product) return null;
        return {
          ...item,
          product,
          lineTotal: product.price * item.quantity,
        };
      })
      .filter((line): line is CartLine => line !== null);
  }, [items]);

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );

  const pricing = useMemo(() => calculateCartPricing(lines), [lines]);

  const value = useMemo(
    () => ({
      items,
      lines,
      itemCount,
      subtotal: pricing.subtotal,
      teeDiscount: pricing.teeDiscount,
      teeCount: pricing.teeCount,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
    }),
    [
      items,
      lines,
      itemCount,
      pricing,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}

export { cartItemKey };
