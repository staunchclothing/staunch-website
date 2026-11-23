import { ProductCatalog } from "@/components/ProductCatalog";
import { ShopListing } from "@/components/ShopListing";
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
      description={`Heavyweight 100% cotton tees. Original tees are £35, or 2 for £65. Ox tees are £55, or 2 for £95. ${FREE_SHIPPING_DETAIL}`}
    >
      <ProductCatalog className="mt-12" layout="t-shirts" />
    </ShopListing>
  );
}
