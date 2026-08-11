import type { Metadata } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import "./globals.css";

const barlow = Barlow_Condensed({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Staunch — Heavyweight Tees & Caps",
    template: "%s | Staunch",
  },
  description:
    "High quality 100% cotton heavyweight t-shirts and caps for hardworking people. Built tough. Built Staunch.",
  openGraph: {
    title: "Staunch — Heavyweight Tees & Caps",
    description:
      "High quality 100% cotton heavyweight t-shirts and caps for hardworking people.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${barlow.variable} ${inter.variable} h-full`}>
      <body className="flex min-h-full flex-col antialiased">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
