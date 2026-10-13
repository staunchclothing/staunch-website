import { ProductCard } from "./ProductCard";
import {
  getAccessoryProducts,
  getCoreProducts,
  getNewReleaseProducts,
  getTeeProducts,
} from "@/lib/products";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

type CatalogLayout = "all" | "t-shirts" | "accessories";

function ProductGrid({
  products,
  columns,
}: {
  products: Product[];
  columns: 2 | 3;
}) {
  return (
    <div
      className={cn(
        "grid gap-8",
        columns === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2",
      )}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export function ProductCatalog({
  layout = "all",
  className,
}: {
  layout?: CatalogLayout;
  className?: string;
}) {
  if (layout === "t-shirts") {
    return (
      <div className={className}>
        <ProductGrid products={getTeeProducts()} columns={3} />
      </div>
    );
  }

  if (layout === "accessories") {
    return (
      <div className={className}>
        <ProductGrid products={getAccessoryProducts()} columns={2} />
      </div>
    );
  }

  const newReleases = getNewReleaseProducts();
  const coreProducts = getCoreProducts();

  return (
    <div className={cn("space-y-12", className)}>
      {newReleases.length > 0 && (
        <section>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-staunch-accent">
            New
          </p>
          <div className="mt-4">
            <ProductGrid products={newReleases} columns={2} />
          </div>
        </section>
      )}
      {coreProducts.length > 0 && (
        <ProductGrid products={coreProducts} columns={2} />
      )}
    </div>
  );
}
