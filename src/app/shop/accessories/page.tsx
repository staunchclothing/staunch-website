import { ProductCatalog } from "@/components/ProductCatalog";
import { ShopListing } from "@/components/ShopListing";
import { FREE_SHIPPING_DETAIL } from "@/lib/shipping";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accessories",
  description: "Shop the Staunch cap and The Staunch Opener.",
};

export default function AccessoriesPage() {
  return (
    <ShopListing
      title="Accessories"
      description={`The Staunch cap and The Staunch Opener. ${FREE_SHIPPING_DETAIL}`}
    >
      <ProductCatalog className="mt-12" layout="accessories" />
    </ShopListing>
  );
}
