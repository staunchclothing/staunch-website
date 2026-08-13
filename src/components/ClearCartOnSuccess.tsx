"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { CART_STORAGE_KEY, useCart } from "@/context/CartContext";

export function ClearCartOnSuccess() {
  const { clearCart } = useCart();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (!sessionId) return;
    localStorage.removeItem(CART_STORAGE_KEY);
    clearCart();
  }, [clearCart, sessionId]);

  return null;
}
