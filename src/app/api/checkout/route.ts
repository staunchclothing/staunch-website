import { NextResponse } from "next/server";
import Stripe from "stripe";
import { buildCheckoutLineItems } from "@/lib/pricing";
import { getProductById } from "@/lib/products";
import {
  isFreeShippingEligible,
  UK_STANDARD_SHIPPING,
  US_STANDARD_SHIPPING,
} from "@/lib/shipping";
import { getStripe } from "@/lib/stripe";
import type { CartItem } from "@/types";

const shippingRate = (
  displayName: string,
  amountPence: number,
  minDays: number,
  maxDays: number,
): Stripe.Checkout.SessionCreateParams.ShippingOption => ({
  shipping_rate_data: {
    type: "fixed_amount",
    fixed_amount: { amount: amountPence, currency: "gbp" },
    display_name: displayName,
    delivery_estimate: {
      minimum: { unit: "business_day", value: minDays },
      maximum: { unit: "business_day", value: maxDays },
    },
  },
});

export async function POST(request: Request) {
  try {
    if (!process.env.STRIPE_SECRET_KEY?.trim()) {
      return NextResponse.json(
        { error: "Stripe is not configured. Add STRIPE_SECRET_KEY in Vercel." },
        { status: 500 },
      );
    }

    const { items } = (await request.json()) as { items: CartItem[] };

    if (!items?.length) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    for (const item of items) {
      if (!getProductById(item.productId)) {
        return NextResponse.json(
          { error: `Product not found: ${item.productId}` },
          { status: 400 },
        );
      }
    }

    const stripe = getStripe();
    const checkoutLines = buildCheckoutLineItems(items);
    const subtotal = checkoutLines.reduce(
      (sum, line) => sum + line.unitAmount * line.quantity,
      0,
    );

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] =
      checkoutLines.map((line) => ({
        price_data: {
          currency: "gbp",
          product_data: {
            name: line.name,
            description: line.description,
          },
          unit_amount: line.unitAmount,
        },
        quantity: line.quantity,
      }));

    const origin =
      request.headers.get("origin") ||
      process.env.NEXT_PUBLIC_SITE_URL ||
      "http://localhost:3000";

    const freeShipping = isFreeShippingEligible(subtotal);
    const shippingOptions: Stripe.Checkout.SessionCreateParams.ShippingOption[] =
      freeShipping
        ? [
            shippingRate("Free UK shipping", 0, 2, 5),
            shippingRate("Free US shipping", 0, 5, 14),
          ]
        : [
            shippingRate("Standard UK delivery", UK_STANDARD_SHIPPING, 2, 5),
            shippingRate("Standard US delivery", US_STANDARD_SHIPPING, 5, 14),
          ];

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      shipping_address_collection: {
        allowed_countries: ["GB", "US"],
      },
      shipping_options: shippingOptions,
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cart`,
      phone_number_collection: { enabled: true },
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Stripe did not return a checkout URL" },
        { status: 500 },
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to create checkout session";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
