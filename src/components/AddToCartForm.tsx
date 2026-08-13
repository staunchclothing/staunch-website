"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { getAvailableSizes, isSizeAvailable } from "@/lib/products";
import type { Product, Size } from "@/types";
import { cn } from "@/lib/utils";

const MAX_QUANTITY = 10;

export function AddToCartForm({ product }: { product: Product }) {
  const availableSizes = useMemo(() => getAvailableSizes(product), [product]);
  const [size, setSize] = useState<Size>(
    () => availableSizes[0] ?? product.sizes[0],
  );
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();
  const router = useRouter();
  const canPurchase = isSizeAvailable(product, size);

  function handleAdd() {
    if (!canPurchase) return;
    addItem(product, size, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="space-y-6">
      {product.sizes.length > 1 && (
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-staunch-muted">
            Size
          </p>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((s) => {
              const soldOut = !isSizeAvailable(product, s);

              return (
                <button
                  key={s}
                  type="button"
                  disabled={soldOut}
                  onClick={() => setSize(s)}
                  className={cn(
                    "min-w-[3.5rem] rounded-md border px-4 py-2.5 text-sm font-medium transition-colors",
                    soldOut &&
                      "cursor-not-allowed border-staunch-border/60 text-staunch-muted/60 line-through",
                    !soldOut &&
                      size === s &&
                      "border-staunch-accent bg-staunch-accent text-white",
                    !soldOut &&
                      size !== s &&
                      "border-staunch-border text-staunch-fg hover:border-staunch-accent",
                  )}
                >
                  {soldOut ? `${s} — Sold out` : s}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div>
        <label
          htmlFor="quantity"
          className="mb-3 block text-xs font-semibold uppercase tracking-[0.2em] text-staunch-muted"
        >
          Quantity
        </label>
        <select
          id="quantity"
          value={quantity}
          disabled={!canPurchase}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-full max-w-[8rem] rounded-md border border-staunch-border bg-staunch-bg px-4 py-2.5 text-sm text-staunch-fg outline-none transition-colors focus:border-staunch-accent disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
        >
          {Array.from({ length: MAX_QUANTITY }, (_, i) => i + 1).map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={handleAdd}
          disabled={!canPurchase}
          className="flex-1 rounded-md bg-staunch-accent px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.15em] text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {added ? "Added to cart" : canPurchase ? "Add to cart" : "Sold out"}
        </button>
        <button
          type="button"
          disabled={!canPurchase}
          onClick={() => {
            addItem(product, size, quantity);
            router.push("/cart");
          }}
          className="rounded-md border border-staunch-border px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.15em] text-staunch-fg transition-colors hover:border-staunch-accent hover:text-staunch-accent disabled:cursor-not-allowed disabled:opacity-50"
        >
          Buy now
        </button>
      </div>
    </div>
  );
}
