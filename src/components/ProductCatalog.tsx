import { ProductCard } from "./ProductCard";
import {
  getAccessoryProducts,
  getNewReleaseProducts,
  getShopAllProducts,
  getTeeProducts,
} from "@/lib/products";
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

  return (
    <div className={className}>
      <ProductGrid products={getShopAllProducts()} />
    </div>
  );
}
