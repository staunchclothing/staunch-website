import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
  aspect?: "square" | "portrait" | "wide" | "fill";
  fit?: "cover" | "contain";
  priority?: boolean;
}

export function ProductImage({
  src,
  alt,
  className,
  aspect = "portrait",
  fit = "cover",
  priority = false,
}: ProductImageProps) {
  const contain = fit === "contain";
  const aspectClass =
    aspect === "fill"
      ? "h-full w-full"
      : aspect === "square"
        ? "aspect-square"
        : aspect === "wide"
          ? "aspect-[16/9]"
          : "aspect-[4/5]";

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-staunch-surface",
        aspectClass,
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className={
          contain
            ? "object-contain object-center p-3"
            : "object-cover object-center"
        }
        sizes="(max-width: 768px) 100vw, 50vw"
        priority={priority}
      />
    </div>
  );
}
