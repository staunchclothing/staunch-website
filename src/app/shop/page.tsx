import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";
import { FREE_SHIPPING_DETAIL } from "@/lib/shipping";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop",
  description: "Shop Staunch heavyweight tees and caps.",
};

export default function ShopPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-staunch-accent">
          Shop
        </p>
        <h1 className="font-display mt-2 text-4xl font-bold uppercase tracking-tight sm:text-5xl">
          All products
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-staunch-muted sm:text-base">
          Heavyweight 100% cotton tees in white and black, plus the Staunch cap.
          Tees are £35 each, or 2 for £65. {FREE_SHIPPING_DETAIL}
        </p>
      </div>

      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
