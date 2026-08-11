export const US_SHIPPING_MINIMUM = 6500;

export function isUsShippingEligible(subtotalPence: number): boolean {
  return subtotalPence >= US_SHIPPING_MINIMUM;
}
