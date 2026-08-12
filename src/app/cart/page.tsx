"use client";

import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { ProductImage } from "@/components/ProductImage";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/products";
import {
  freeShippingRemaining,
  isFreeShippingEligible,
} from "@/lib/shipping";

export default function CartPage() {
  const { lines, subtotal, teeDiscount, teeCount, updateQuantity, removeItem, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCheckout() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: lines.map((line) => ({
            productId: line.productId,
            size: line.size,
            quantity: line.quantity,
          })),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Checkout failed");
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  }

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-24 text-center sm:px-6">
        <h1 className="font-display text-3xl font-bold uppercase tracking-tight sm:text-4xl">
          Your cart is empty
        </h1>
        <p className="mt-4 text-sm text-staunch-muted">
          Add some heavyweight kit and come back when you&apos;re ready.
        </p>
        <Link
          href="/shop"
          className="mt-8 inline-flex rounded-md bg-staunch-accent px-8 py-3.5 text-sm font-semibold uppercase tracking-[0.15em] text-white transition-opacity hover:opacity-90"
        >
          Shop now
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="font-display text-4xl font-bold uppercase tracking-tight sm:text-5xl">
        Cart
      </h1>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          {lines.map((line) => (
            <div
              key={`${line.productId}-${line.size}`}
              className="flex gap-4 rounded-lg border border-staunch-border bg-staunch-surface p-4 sm:gap-6 sm:p-6"
            >
              <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-md sm:h-28 sm:w-24">
                <ProductImage
                  src={line.product.image}
                  alt={line.product.name}
                  aspect="fill"
                  className="h-full w-full"
                />
              </div>

              <div className="flex flex-1 flex-col justify-between">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="font-display text-base font-semibold uppercase sm:text-lg">
                      {line.product.name}
                    </h2>
                    <p className="mt-1 text-sm text-staunch-muted">
                      Size: {line.size}
                    </p>
                  </div>
                  <p className="text-sm font-medium sm:text-base">
                    {formatPrice(line.lineTotal)}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(
                          line.productId,
                          line.size,
                          line.quantity - 1,
                        )
                      }
                      className="flex h-8 w-8 items-center justify-center rounded-md border border-staunch-border text-staunch-muted hover:border-staunch-accent hover:text-staunch-accent"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-8 text-center text-sm">{line.quantity}</span>
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(
                          line.productId,
                          line.size,
                          line.quantity + 1,
                        )
                      }
                      className="flex h-8 w-8 items-center justify-center rounded-md border border-staunch-border text-staunch-muted hover:border-staunch-accent hover:text-staunch-accent"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(line.productId, line.size)}
                    className="flex items-center gap-1.5 text-xs uppercase tracking-[0.15em] text-staunch-muted transition-colors hover:text-red-400"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={clearCart}
            className="text-xs uppercase tracking-[0.15em] text-staunch-muted transition-colors hover:text-staunch-accent"
          >
            Clear cart
          </button>
        </div>

        <div className="h-fit rounded-xl border border-staunch-border bg-staunch-surface p-6">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-staunch-muted">
            Order summary
          </h2>
          <div className="mt-4 flex justify-between text-sm">
            <span className="text-staunch-muted">Subtotal</span>
            <span>{formatPrice(subtotal + teeDiscount)}</span>
          </div>
          {teeDiscount > 0 && (
            <div className="mt-2 flex justify-between text-sm text-staunch-accent">
              <span>2 for £65 discount</span>
              <span>-{formatPrice(teeDiscount)}</span>
            </div>
          )}
          {teeCount === 1 && (
            <p className="mt-3 text-xs text-staunch-muted">
              Add another tee to get 2 for £65
            </p>
          )}
          {!isFreeShippingEligible(subtotal) && subtotal > 0 && (
            <p className="mt-3 text-xs text-staunch-muted">
              Spend {formatPrice(freeShippingRemaining(subtotal))} more for free
              shipping
            </p>
          )}
          {isFreeShippingEligible(subtotal) && (
            <p className="mt-3 text-xs text-staunch-accent">
              You&apos;ve qualified for free shipping
            </p>
          )}
          <div className="mt-2 flex justify-between text-sm">
            <span className="text-staunch-muted">Shipping</span>
            <span className="font-medium text-staunch-fg">
              {isFreeShippingEligible(subtotal) ? "Free" : "At checkout"}
            </span>
          </div>
          {!isFreeShippingEligible(subtotal) && (
            <p className="mt-1 text-xs text-staunch-muted">
              Standard delivery: £4.95 UK · £14.95 US
            </p>
          )}
          <div className="mt-4 flex justify-between border-t border-staunch-border pt-4 text-base font-medium">
            <span>Total</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          {!isFreeShippingEligible(subtotal) && (
            <p className="mt-1 text-xs text-staunch-muted">
              Shipping added at checkout
            </p>
          )}

          {error && (
            <p className="mt-4 rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
              {error}
            </p>
          )}

          <button
            type="button"
            onClick={handleCheckout}
            disabled={loading}
            className="mt-6 w-full rounded-md bg-staunch-accent px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.15em] text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Redirecting…" : "Checkout with Stripe"}
          </button>

          <p className="mt-4 text-center text-xs text-staunch-muted">
            Secure payment powered by Stripe
          </p>
        </div>
      </div>
    </div>
  );
}
