"use client";

import { useState } from "react";
import { ProductImage } from "./ProductImage";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  images: string[];
  alt: string;
  fit?: "cover" | "contain";
}

export function ProductGallery({ images, alt, fit = "cover" }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-lg border border-staunch-border">
        <ProductImage
          src={images[activeIndex]}
          alt={alt}
          fit={fit}
          className="w-full"
          priority
        />
      </div>

      {images.length > 1 && (
        <div
          className={cn(
            "grid gap-3",
            images.length === 3 ? "grid-cols-3" : "grid-cols-2",
          )}
        >
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={cn(
                "overflow-hidden rounded-lg border transition-colors",
                activeIndex === index
                  ? "border-staunch-accent"
                  : "border-staunch-border hover:border-staunch-accent/50",
              )}
            >
              <ProductImage
                src={image}
                alt={`${alt} view ${index + 1}`}
                aspect={fit === "contain" ? "portrait" : "square"}
                fit={fit}
                className="w-full"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
