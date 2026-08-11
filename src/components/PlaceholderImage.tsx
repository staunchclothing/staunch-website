import { cn } from "@/lib/utils";

interface PlaceholderImageProps {
  label: string;
  category?: "tee" | "cap";
  color?: string;
  className?: string;
  aspect?: "square" | "portrait" | "wide";
}

export function PlaceholderImage({
  label,
  category = "tee",
  color = "neutral",
  className,
  aspect = "portrait",
}: PlaceholderImageProps) {
  const isWhite = color.toLowerCase() === "white";
  const isBlack = color.toLowerCase() === "black";

  const aspectClass =
    aspect === "square"
      ? "aspect-square"
      : aspect === "wide"
        ? "aspect-[16/9]"
        : "aspect-[4/5]";

  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden bg-staunch-bg",
        aspectClass,
        className,
      )}
    >
      <div
        className={cn(
          "absolute inset-0 opacity-[0.04]",
          "bg-[linear-gradient(135deg,transparent_40%,currentColor_40%,currentColor_60%,transparent_60%)]",
          "text-staunch-fg",
        )}
      />
      {category === "cap" ? (
        <div className="relative flex flex-col items-center gap-3">
          <div className="h-16 w-28 rounded-t-full border-2 border-staunch-fg/20 bg-staunch-surface" />
          <div className="h-3 w-32 rounded-sm bg-staunch-fg/10" />
        </div>
      ) : (
        <div className="relative flex flex-col items-center">
          <div
            className={cn(
              "h-40 w-36 rounded-sm border border-staunch-border shadow-sm",
              isWhite ? "bg-white" : isBlack ? "bg-staunch-fg" : "bg-staunch-surface",
            )}
          />
          <div className="mt-4 h-8 w-8 rounded-full border-2 border-staunch-border" />
        </div>
      )}
      <span className="absolute bottom-4 left-4 text-xs font-medium uppercase tracking-[0.2em] text-staunch-muted">
        {label} — Photo coming soon
      </span>
    </div>
  );
}
