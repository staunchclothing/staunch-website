import { ProductCatalog } from "@/components/ProductCatalog";
import { ShopListing } from "@/components/ShopListing";
import { FREE_SHIPPING_DETAIL } from "@/lib/shipping";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "New",
  description:
    "New from Staunch: The Ox T-Shirt Tallow and The Ox T-Shirt Navy.",
};

export default function NewPage() {
  return (
    <ShopListing
      title="New"
      description={`The Ox T-Shirt Tallow and The Ox T-Shirt Navy. ${FREE_SHIPPING_DETAIL}`}
    >
      <ProductCatalog className="mt-12" layout="new" />
    </ShopListing>
  );
}
