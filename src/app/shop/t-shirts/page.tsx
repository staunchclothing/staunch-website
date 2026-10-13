import { ProductCatalog } from "@/components/ProductCatalog";
import { ShopListing } from "@/components/ShopListing";
import { getTeeProducts } from "@/lib/products";
import { FREE_SHIPPING_DETAIL } from "@/lib/shipping";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "T-shirts",
  description: "Shop Staunch heavyweight t-shirts.",
};

export default function TShirtsPage() {
  return (
    <ShopListing
      title="T-shirts"
      description={`Heavyweight 100% cotton tees. Standard tees are £35 each, or 2 for £65. ${FREE_SHIPPING_DETAIL}`}
    >
      <ProductCatalog className="mt-12" items={getTeeProducts()} />
    </ShopListing>
  );
}
