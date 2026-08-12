export const FREE_SHIPPING_MINIMUM = 6500;
export const UK_STANDARD_SHIPPING = 495;
export const US_STANDARD_SHIPPING = 1495;

export const FREE_SHIPPING_SHORT =
  "Free shipping on orders of £65 or more.";

export const FREE_SHIPPING_DETAIL =
  "Free shipping on orders of £65 or more. Below that, standard delivery is £4.95 (UK) or £14.95 (US).";

export function isFreeShippingEligible(subtotalPence: number): boolean {
  return subtotalPence >= FREE_SHIPPING_MINIMUM;
}

export function freeShippingRemaining(subtotalPence: number): number {
  return Math.max(0, FREE_SHIPPING_MINIMUM - subtotalPence);
}
