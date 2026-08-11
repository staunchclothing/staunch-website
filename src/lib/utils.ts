import type { CartItem } from "@/types";

export function cartItemKey(productId: string, size: string): string {
  return `${productId}:${size}`;
}

export function parseCartItemKey(key: string): CartItem {
  const [productId, size] = key.split(":");
  return {
    productId,
    size: size as CartItem["size"],
    quantity: 0,
  };
}

export function cn(...classes: (string | false | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}
