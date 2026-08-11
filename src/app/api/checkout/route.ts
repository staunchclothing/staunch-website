import { NextResponse } from "next/server";
import Stripe from "stripe";
import { buildCheckoutLineItems } from "@/lib/pricing";
import { getProductById } from "@/lib/products";
import { getStripe } from "@/lib/stripe";
import { isUsShippingEligible } from "@/lib/shipping";
import type { CartItem } from "@/types";

const freeShippingRate = (
  displayName: string,
  minDays: number,
  maxDays: number,
): Stripe.Checkout.SessionCreateParams.ShippingOption => ({
  shipping_rate_data: {
    type: "fixed_amount",
    fixed_amount: { amount: 0, currency: "gbp" },
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

    const usEligible = isUsShippingEligible(subtotal);
    const shippingOptions: Stripe.Checkout.SessionCreateParams.ShippingOption[] =
      [freeShippingRate("Free UK shipping", 2, 5)];

    if (usEligible) {
      shippingOptions.push(freeShippingRate("Free US shipping", 5, 14));
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      shipping_address_collection: {
        allowed_countries: usEligible ? ["GB", "US"] : ["GB"],
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
