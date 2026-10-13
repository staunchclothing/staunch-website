import { ProductCatalog } from "@/components/ProductCatalog";
import { ShopListing } from "@/components/ShopListing";
import { FREE_SHIPPING_DETAIL } from "@/lib/shipping";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "New",
  description:
    "New from Staunch: The Ox T-Shirt and The Staunch Opener.",
};

export default function NewPage() {
  return (
    <ShopListing
      title="New"
      description={`The Ox T-Shirt and The Staunch Opener. ${FREE_SHIPPING_DETAIL}`}
    >
      <ProductCatalog className="mt-12" layout="new" />
    </ShopListing>
  );
}
