import { ProductCard } from "./ProductCard";
import { getCoreProducts, getNewReleaseProducts } from "@/lib/products";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

export function ProductCatalog({
  items,
  className,
}: {
  items?: Product[];
  className?: string;
}) {
  const catalog = items ?? null;
  const newReleases = catalog
    ? catalog.filter((product) => product.newRelease)
    : getNewReleaseProducts();
  const coreProducts = catalog
    ? catalog.filter((product) => !product.newRelease)
    : getCoreProducts();

  return (
    <div className={cn("space-y-12", className)}>
      {newReleases.length > 0 && (
        <section>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-staunch-accent">
            New
          </p>
          <div className="mt-4 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {newReleases.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}
      {coreProducts.length > 0 && (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {coreProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
