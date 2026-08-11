import Image from "next/image";
import { cn } from "@/lib/utils";

const WORDMARK = "/logos/staunch-wordmark.png";
const WORDMARK_WIDTH = 1024;
const WORDMARK_HEIGHT = 401;

type BlendBackground = "bg" | "surface";

interface LogoProps {
  className?: string;
  variant?: "full" | "oxen" | "wordmark";
  blendWith?: BlendBackground;
}

function LogoImage({
  src,
  alt,
  width,
  height,
  imageClassName,
  wrapperClassName,
  decorative,
  blendWith = "bg",
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  imageClassName?: string;
  wrapperClassName?: string;
  decorative?: boolean;
  blendWith?: BlendBackground;
}) {
  return (
    <span
      className={cn(
        "inline-block shrink-0",
        blendWith === "surface" ? "bg-staunch-surface" : "bg-staunch-bg",
        wrapperClassName,
      )}
      aria-hidden={decorative || undefined}
    >
      <Image
        src={src}
        alt={decorative ? "" : alt}
        width={width}
        height={height}
        className={cn("block h-auto max-h-none w-auto mix-blend-multiply", imageClassName)}
        priority
      />
    </span>
  );
}

function Wordmark({
  className,
  widthClassName = "w-36 sm:w-40",
  blendWith = "bg",
}: {
  className?: string;
  widthClassName?: string;
  blendWith?: BlendBackground;
}) {
  return (
    <LogoImage
      src={WORDMARK}
      alt="Staunch"
      width={WORDMARK_WIDTH}
      height={WORDMARK_HEIGHT}
      imageClassName={cn(widthClassName, "max-w-full")}
      wrapperClassName={className}
      blendWith={blendWith}
    />
  );
}

export function Logo({ className, variant = "full", blendWith = "bg" }: LogoProps) {
  if (variant === "oxen") {
    return (
      <LogoImage
        src="/logos/oxen.png"
        alt="Staunch oxen logo"
        width={320}
        height={160}
        wrapperClassName={className}
        blendWith={blendWith}
      />
    );
  }

  if (variant === "wordmark") {
    return <Wordmark className={className} blendWith={blendWith} />;
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-3 bg-staunch-bg sm:gap-3.5",
        className,
      )}
    >
      <LogoImage
        src="/logos/oxen.png"
        alt="Staunch oxen logo"
        width={120}
        height={60}
        imageClassName="h-[3rem] w-auto sm:h-[3.5rem]"
        decorative
        blendWith={blendWith}
      />
      <Wordmark widthClassName="w-[8.5rem] sm:w-[10.5rem]" blendWith={blendWith} />
    </span>
  );
}

export function HeroLogoStack({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex w-full max-w-md flex-col items-center justify-center bg-staunch-bg px-4",
        className,
      )}
    >
      <LogoImage
        src="/logos/oxen.png"
        alt="Staunch oxen logo"
        width={320}
        height={160}
        wrapperClassName="flex w-full justify-center"
        imageClassName="mx-auto w-full max-w-[280px]"
      />
      <Wordmark
        className="mt-8 flex w-full justify-center"
        widthClassName="w-full max-w-[300px]"
      />
    </div>
  );
}
