import Link from "next/link";
import { ProductImage } from "./ProductImage";
import { formatPrice } from "@/lib/products";
import type { Product } from "@/types";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/shop/${product.slug}`} className="group block">
      <div className="overflow-hidden rounded-lg border border-staunch-border bg-staunch-surface transition-colors group-hover:border-staunch-accent/50">
        <ProductImage
          src={product.image}
          alt={product.name}
          className="w-full transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-lg font-semibold uppercase tracking-wide text-staunch-fg">
            {product.name}
          </h3>
          <p className="mt-1 text-sm text-staunch-muted">{product.color}</p>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-sm font-medium text-staunch-fg">
            {formatPrice(product.price)}
          </p>
          {product.category === "tee" && (
            <p className="mt-0.5 text-xs text-staunch-accent">2 for £65</p>
          )}
        </div>
      </div>
    </Link>
  );
}
