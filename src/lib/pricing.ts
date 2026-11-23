import {
  getProductById,
  isOxTeeProduct,
  isTeeDealProduct,
} from "@/lib/products";
import type { CartItem, CartLine } from "@/types";

export const TEE_PRICE = 3500;
export const TEE_PAIR_PRICE = 6500;
export const OX_TEE_PRICE = 5500;
export const OX_TEE_PAIR_PRICE = 9500;

export interface CartPricing {
  teeCount: number;
  teeDiscount: number;
  oxCount: number;
  oxDiscount: number;
  capSubtotal: number;
  subtotal: number;
}

function pairDeal(count: number, unitPrice: number, pairPrice: number) {
  const pairs = Math.floor(count / 2);
  const singles = count % 2;
  const fullPrice = count * unitPrice;
  const subtotal = pairs * pairPrice + singles * unitPrice;
  return {
    count,
    discount: fullPrice - subtotal,
    subtotal,
  };
}

export function countTees(
  items: Pick<CartItem, "productId" | "quantity">[],
): number {
  return items.reduce((sum, item) => {
    const product = getProductById(item.productId);
    if (isTeeDealProduct(product)) return sum + item.quantity;
    return sum;
  }, 0);
}

export function calculateCartPricing(lines: CartLine[]): CartPricing {
  let teeCount = 0;
  let oxCount = 0;
  let capSubtotal = 0;

  for (const line of lines) {
    if (isTeeDealProduct(line.product)) {
      teeCount += line.quantity;
    } else if (isOxTeeProduct(line.product)) {
      oxCount += line.quantity;
    } else {
      capSubtotal += line.lineTotal;
    }
  }

  const original = pairDeal(teeCount, TEE_PRICE, TEE_PAIR_PRICE);
  const ox = pairDeal(oxCount, OX_TEE_PRICE, OX_TEE_PAIR_PRICE);

  return {
    teeCount,
    teeDiscount: original.discount,
    oxCount,
    oxDiscount: ox.discount,
    capSubtotal,
    subtotal: original.subtotal + ox.subtotal + capSubtotal,
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
  const originalTeeUnits: CheckoutUnit[] = [];
  const oxTeeUnits: CheckoutUnit[] = [];

  for (const item of items) {
    const product = getProductById(item.productId);
    if (!product) continue;

    if (isTeeDealProduct(product)) {
      for (let i = 0; i < item.quantity; i++) {
        originalTeeUnits.push({ productId: item.productId, size: item.size });
      }
      continue;
    }

    if (isOxTeeProduct(product)) {
      for (let i = 0; i < item.quantity; i++) {
        oxTeeUnits.push({ productId: item.productId, size: item.size });
      }
      continue;
    }

    lineItems.push({
      name: checkoutItemName(product.name, item.size),
      description: `Size ${item.size}`,
      unitAmount: product.price,
      quantity: item.quantity,
      metadata: {
        productId: product.id,
        size: item.size,
      },
    });
  }

  addPairedTeeItems(lineItems, originalTeeUnits, TEE_PAIR_PRICE, "2 for £65");
  addPairedTeeItems(lineItems, oxTeeUnits, OX_TEE_PAIR_PRICE, "2 for £95");

  return lineItems;
}

function addPairedTeeItems(
  lineItems: CheckoutLineItem[],
  units: CheckoutUnit[],
  pairPrice: number,
  pairLabel: string,
) {
  while (units.length >= 2) {
    const first = units.shift()!;
    const second = units.shift()!;
    const firstProduct = getProductById(first.productId)!;
    const secondProduct = getProductById(second.productId)!;

    lineItems.push({
      name: `${checkoutItemName(firstProduct.name, first.size)} + ${checkoutItemName(secondProduct.name, second.size)}`,
      description: `${pairLabel} — Size ${first.size} and Size ${second.size}`,
      unitAmount: pairPrice,
      quantity: 1,
      metadata: {
        bundle: "tee-pair",
        item1: `${first.productId}:${first.size}`,
        item2: `${second.productId}:${second.size}`,
      },
    });
  }

  for (const unit of units) {
    const product = getProductById(unit.productId)!;
    lineItems.push({
      name: checkoutItemName(product.name, unit.size),
      description: `Size ${unit.size}`,
      unitAmount: product.price,
      quantity: 1,
      metadata: {
        productId: product.id,
        size: unit.size,
      },
    });
  }
}

function checkoutItemName(name: string, size: CartItem["size"]): string {
  if (!size || size === "One Size") return name;
  return `${name} (Size ${size})`;
}
