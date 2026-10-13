import { ProductCard } from "./ProductCard";
import { getCoreProducts, getNewReleaseProducts } from "@/lib/products";
import { cn } from "@/lib/utils";

export function ProductCatalog({ className }: { className?: string }) {
  const newReleases = getNewReleaseProducts();
  const coreProducts = getCoreProducts();

  return (
    <div className={cn("space-y-8", className)}>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {newReleases.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {coreProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
