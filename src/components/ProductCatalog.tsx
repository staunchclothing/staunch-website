import { ProductCard } from "./ProductCard";
import {
  getAccessoryProducts,
  getCoreProducts,
  getNewReleaseProducts,
  getTeeProducts,
} from "@/lib/products";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

type CatalogLayout = "all" | "new" | "t-shirts" | "accessories";

function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid gap-12 sm:grid-cols-3">
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
  if (layout === "new") {
    return (
      <div className={className}>
        <ProductGrid products={getNewReleaseProducts()} />
      </div>
    );
  }

  if (layout === "t-shirts") {
    return (
      <div className={className}>
        <ProductGrid products={getTeeProducts()} />
      </div>
    );
  }

  if (layout === "accessories") {
    return (
      <div className={className}>
        <ProductGrid products={getAccessoryProducts()} />
      </div>
    );
  }

  const newReleases = getNewReleaseProducts();
  const coreProducts = getCoreProducts();
  const coreTees = coreProducts.filter((product) => product.category === "tee");
  const remaining = coreProducts.filter((product) => product.category !== "tee");

  return (
    <div className={cn("space-y-12", className)}>
      {newReleases.length > 0 && (
        <section>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-staunch-accent">
            New
          </p>
          <div className="mt-4">
            <ProductGrid products={newReleases} />
          </div>
        </section>
      )}
      {coreTees.length > 0 && <ProductGrid products={coreTees} />}
      {remaining.length > 0 && <ProductGrid products={remaining} />}
    </div>
  );
}
