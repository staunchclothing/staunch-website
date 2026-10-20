export const FREE_SHIPPING_MINIMUM = 6500;
export const UK_STANDARD_SHIPPING = 495;
export const INTERNATIONAL_STANDARD_SHIPPING = 1495;

export const FREE_SHIPPING_SHORT =
  "Free shipping on orders of £65 or more.";

export const FREE_SHIPPING_DETAIL =
  "Standard delivery is £4.95 (UK) or £14.95 (International). Free shipping on orders of £65 or more.";

export type ShippingRegion = "uk" | "international";

const STRIPE_CHECKOUT_COUNTRIES = [
  "AC", "AD", "AE", "AF", "AG", "AI", "AL", "AM", "AO", "AQ", "AR", "AT", "AU",
  "AW", "AX", "AZ", "BA", "BB", "BD", "BE", "BF", "BG", "BH", "BI", "BJ", "BL",
  "BM", "BN", "BO", "BQ", "BR", "BS", "BT", "BV", "BW", "BY", "BZ", "CA", "CD",
  "CF", "CG", "CH", "CI", "CK", "CL", "CM", "CN", "CO", "CR", "CV", "CW", "CY",
  "CZ", "DE", "DJ", "DK", "DM", "DO", "DZ", "EC", "EE", "EG", "EH", "ER", "ES",
  "ET", "FI", "FJ", "FK", "FO", "FR", "GA", "GB", "GD", "GE", "GF", "GG", "GH",
  "GI", "GL", "GM", "GN", "GP", "GQ", "GR", "GS", "GT", "GU", "GW", "GY", "HK",
  "HN", "HR", "HT", "HU", "ID", "IE", "IL", "IM", "IN", "IO", "IQ", "IS", "IT",
  "JE", "JM", "JO", "JP", "KE", "KG", "KH", "KI", "KM", "KN", "KR", "KW", "KY",
  "KZ", "LA", "LB", "LC", "LI", "LK", "LR", "LS", "LT", "LU", "LV", "LY", "MA",
  "MC", "MD", "ME", "MF", "MG", "MK", "ML", "MM", "MN", "MO", "MQ", "MR", "MS",
  "MT", "MU", "MV", "MW", "MX", "MY", "MZ", "NA", "NC", "NE", "NG", "NI", "NL",
  "NO", "NP", "NR", "NU", "NZ", "OM", "PA", "PE", "PF", "PG", "PH", "PK", "PL",
  "PM", "PN", "PR", "PS", "PT", "PY", "QA", "RE", "RO", "RS", "RU", "RW", "SA",
  "SB", "SC", "SD", "SE", "SG", "SH", "SI", "SJ", "SK", "SL", "SM", "SN", "SO",
  "SR", "SS", "ST", "SV", "SX", "SZ", "TA", "TC", "TD", "TF", "TG", "TH", "TJ",
  "TK", "TL", "TM", "TN", "TO", "TR", "TT", "TV", "TW", "TZ", "UA", "UG", "US",
  "UY", "UZ", "VA", "VC", "VE", "VG", "VN", "VU", "WF", "WS", "XK", "YE", "YT",
  "ZA", "ZM", "ZW",
] as const;

export const UK_SHIPPING_COUNTRIES = ["GB"] as const;

export const INTERNATIONAL_SHIPPING_COUNTRIES = STRIPE_CHECKOUT_COUNTRIES.filter(
  (country) => country !== "GB",
);

export function isShippingRegion(value: unknown): value is ShippingRegion {
  return value === "uk" || value === "international";
}

export function isFreeShippingEligible(subtotalPence: number): boolean {
  return subtotalPence >= FREE_SHIPPING_MINIMUM;
}

export function freeShippingRemaining(subtotalPence: number): number {
  return Math.max(0, FREE_SHIPPING_MINIMUM - subtotalPence);
}

export function getStandardShippingAmount(region: ShippingRegion): number {
  return region === "uk"
    ? UK_STANDARD_SHIPPING
    : INTERNATIONAL_STANDARD_SHIPPING;
}

export function getCheckoutShipping(region: ShippingRegion, subtotalPence: number) {
  const freeShipping = isFreeShippingEligible(subtotalPence);

  if (region === "uk") {
    return {
      countries: [...UK_SHIPPING_COUNTRIES],
      displayName: freeShipping ? "Free UK shipping" : "Standard UK delivery",
      amountPence: freeShipping ? 0 : UK_STANDARD_SHIPPING,
      minDays: 2,
      maxDays: 5,
    };
  }

  return {
    countries: [...INTERNATIONAL_SHIPPING_COUNTRIES],
    displayName: freeShipping
      ? "Free international shipping"
      : "Standard international delivery",
    amountPence: freeShipping ? 0 : INTERNATIONAL_STANDARD_SHIPPING,
    minDays: 5,
    maxDays: 14,
  };
}
