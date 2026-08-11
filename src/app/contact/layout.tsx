import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Staunch — questions about orders, sizing, or shipping.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
