export const FREE_SHIPPING_MINIMUM = 6500;
export const UK_STANDARD_SHIPPING = 495;

export const FREE_SHIPPING_SHORT =
  "Free shipping on orders of £65 or more.";

export const FREE_SHIPPING_DETAIL =
  "Free shipping on orders of £65 or more. Standard UK delivery (£4.95) applies below that.";

export function isFreeShippingEligible(subtotalPence: number): boolean {
  return subtotalPence >= FREE_SHIPPING_MINIMUM;
}

export function freeShippingRemaining(subtotalPence: number): number {
  return Math.max(0, FREE_SHIPPING_MINIMUM - subtotalPence);
}
