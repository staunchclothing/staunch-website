import { getProductById } from "@/lib/products";
import type { CartItem, CartLine } from "@/types";

export const TEE_PRICE = 3500;
export const TEE_PAIR_PRICE = 6500;

export interface CartPricing {
  teeCount: number;
  teePairs: number;
  teeSingles: number;
  teeFullPrice: number;
  teeSubtotal: number;
  teeDiscount: number;
  capSubtotal: number;
  subtotal: number;
}

export function countTees(items: Pick<CartItem, "productId" | "quantity">[]): number {
  return items.reduce((sum, item) => {
    const product = getProductById(item.productId);
    if (product?.category === "tee") return sum + item.quantity;
    return sum;
  }, 0);
}

export function calculateCartPricing(lines: CartLine[]): CartPricing {
  let teeCount = 0;
  let capSubtotal = 0;

  for (const line of lines) {
    if (line.product.category === "tee") {
      teeCount += line.quantity;
    } else {
      capSubtotal += line.lineTotal;
    }
  }

  const teePairs = Math.floor(teeCount / 2);
  const teeSingles = teeCount % 2;
  const teeFullPrice = teeCount * TEE_PRICE;
  const teeSubtotal = teePairs * TEE_PAIR_PRICE + teeSingles * TEE_PRICE;
  const teeDiscount = teeFullPrice - teeSubtotal;

  return {
    teeCount,
    teePairs,
    teeSingles,
    teeFullPrice,
    teeSubtotal,
    teeDiscount,
    capSubtotal,
    subtotal: teeSubtotal + capSubtotal,
  };
}

export interface CheckoutUnit {
  productId: string;
  size: CartItem["size"];
}

export interface CheckoutLineItem {
  name: string;
  description: string;
  unitAmount: number;
  quantity: number;
  metadata: Record<string, string>;
}

export function buildCheckoutLineItems(items: CartItem[]): CheckoutLineItem[] {
  const lineItems: CheckoutLineItem[] = [];
  const teeUnits: CheckoutUnit[] = [];

  for (const item of items) {
    const product = getProductById(item.productId);
    if (!product) continue;

    if (product.category === "tee") {
      for (let i = 0; i < item.quantity; i++) {
        teeUnits.push({ productId: item.productId, size: item.size });
      }
      continue;
    }

    lineItems.push({
      name: product.name,
      description: `Size: ${item.size}`,
      unitAmount: product.price,
      quantity: item.quantity,
      metadata: {
        productId: product.id,
        size: item.size,
      },
    });
  }

  while (teeUnits.length >= 2) {
    const first = teeUnits.shift()!;
    const second = teeUnits.shift()!;
    const firstProduct = getProductById(first.productId)!;
    const secondProduct = getProductById(second.productId)!;

    lineItems.push({
      name: "Heavyweight T-Shirt — 2 for £65",
      description: `${firstProduct.color} (${first.size}), ${secondProduct.color} (${second.size})`,
      unitAmount: TEE_PAIR_PRICE,
      quantity: 1,
      metadata: {
        bundle: "tee-pair",
        item1: `${first.productId}:${first.size}`,
        item2: `${second.productId}:${second.size}`,
      },
    });
  }

  for (const unit of teeUnits) {
    const product = getProductById(unit.productId)!;
    lineItems.push({
      name: product.name,
      description: `Size: ${unit.size}`,
      unitAmount: TEE_PRICE,
      quantity: 1,
      metadata: {
        productId: product.id,
        size: unit.size,
      },
    });
  }

  return lineItems;
}
