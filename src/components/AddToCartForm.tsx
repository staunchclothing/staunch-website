"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import type { Product, Size } from "@/types";
import { cn } from "@/lib/utils";

export function AddToCartForm({ product }: { product: Product }) {
  const [size, setSize] = useState<Size>(product.sizes[0]);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();
  const router = useRouter();

  function handleAdd() {
    addItem(product, size);
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
            {product.sizes.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSize(s)}
                className={cn(
                  "min-w-[3.5rem] rounded-md border px-4 py-2.5 text-sm font-medium transition-colors",
                  size === s
                    ? "border-staunch-accent bg-staunch-accent text-white"
                    : "border-staunch-border text-staunch-fg hover:border-staunch-accent",
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={handleAdd}
          className="flex-1 rounded-md bg-staunch-accent px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.15em] text-white transition-opacity hover:opacity-90"
        >
          {added ? "Added to cart" : "Add to cart"}
        </button>
        <button
          type="button"
          onClick={() => {
            addItem(product, size);
            router.push("/cart");
          }}
          className="rounded-md border border-staunch-border px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.15em] text-staunch-fg transition-colors hover:border-staunch-accent hover:text-staunch-accent"
        >
          Buy now
        </button>
      </div>
    </div>
  );
}
