import Link from "next/link";
import { Suspense } from "react";
import { CheckCircle } from "lucide-react";
import { ClearCartOnSuccess } from "@/components/ClearCartOnSuccess";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order confirmed",
  robots: { index: false },
};

export default function SuccessPage() {
  return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center sm:px-6">
      <Suspense fallback={null}>
        <ClearCartOnSuccess />
      </Suspense>
      <CheckCircle className="mx-auto h-12 w-12 text-staunch-accent" />
      <h1 className="font-display mt-6 text-3xl font-bold uppercase tracking-tight sm:text-4xl">
        Order confirmed
      </h1>
      <p className="mt-4 text-sm leading-relaxed text-staunch-muted sm:text-base">
        Thanks for your order. You&apos;ll receive a confirmation email from
        Stripe shortly. We&apos;ll dispatch your Staunch gear within 2–3 working
        days.
      </p>
      <Link
        href="/shop"
        className="mt-8 inline-flex rounded-md bg-staunch-accent px-8 py-3.5 text-sm font-semibold uppercase tracking-[0.15em] text-white transition-opacity hover:opacity-90"
      >
        Continue shopping
      </Link>
    </div>
  );
}
