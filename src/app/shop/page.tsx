import { ProductCatalog } from "@/components/ProductCatalog";
import { ShopListing } from "@/components/ShopListing";
import { FREE_SHIPPING_DETAIL } from "@/lib/shipping";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop",
  description: "Shop Staunch heavyweight tees, caps, and bottle openers.",
};

export default function ShopPage() {
  return (
    <ShopListing
      title="All products"
      description={`Heavyweight 100% cotton tees, the Staunch cap, and The Staunch Opener. Standard tees are £35 each, or 2 for £65. ${FREE_SHIPPING_DETAIL}`}
    >
      <ProductCatalog className="mt-12" />
    </ShopListing>
  );
}
