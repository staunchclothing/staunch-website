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
  wordmarkClassName?: string;
  oxenClassName?: string;
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
        className={cn("block mix-blend-multiply", imageClassName)}
        priority
      />
    </span>
  );
}

function Wordmark({
  className,
  widthClassName = "w-28 sm:w-40",
  blendWith = "bg",
  constrainWidth = false,
}: {
  className?: string;
  widthClassName?: string;
  blendWith?: BlendBackground;
  constrainWidth?: boolean;
}) {
  return (
    <LogoImage
      src={WORDMARK}
      alt="Staunch"
      width={WORDMARK_WIDTH}
      height={WORDMARK_HEIGHT}
      imageClassName={cn(widthClassName, constrainWidth && "max-w-full")}
      wrapperClassName={className}
      blendWith={blendWith}
    />
  );
}

export function Logo({
  className,
  variant = "full",
  blendWith = "bg",
  wordmarkClassName,
  oxenClassName,
}: LogoProps) {
  if (variant === "oxen") {
    return (
      <LogoImage
        src="/logos/oxen.png"
        alt="Staunch oxen logo"
        width={320}
        height={160}
        imageClassName={cn("h-8 w-auto sm:h-10", oxenClassName)}
        wrapperClassName={className}
        blendWith={blendWith}
      />
    );
  }

  if (variant === "wordmark") {
    return (
      <Wordmark
        className={className}
        widthClassName={wordmarkClassName}
        blendWith={blendWith}
        constrainWidth
      />
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 bg-staunch-bg sm:gap-3.5",
        className,
      )}
    >
      <LogoImage
        src="/logos/oxen.png"
        alt="Staunch oxen logo"
        width={120}
        height={60}
        imageClassName={cn("h-8 w-auto sm:h-[3.5rem]", oxenClassName)}
        decorative
        blendWith={blendWith}
      />
      <Wordmark
        widthClassName={cn(
          "h-8 w-auto sm:h-auto sm:w-[10.5rem]",
          wordmarkClassName,
        )}
        blendWith={blendWith}
      />
    </span>
  );
}

export function HeroLogoStack({ className }: { className?: string }) {
  const stackWidth = "w-full max-w-[200px] sm:max-w-[280px]";

  return (
    <div
      className={cn(
        "flex w-full max-w-md flex-col items-center justify-center bg-staunch-bg px-4",
        className,
      )}
    >
      <div className={stackWidth}>
        <LogoImage
          src="/logos/oxen.png"
          alt="Staunch oxen logo"
          width={320}
          height={160}
          wrapperClassName="block w-full"
          imageClassName="mx-auto h-auto w-full"
        />
      </div>
      <div className={cn("mt-8", stackWidth)}>
        <Wordmark
          className="block w-full"
          widthClassName="h-auto w-full"
          constrainWidth
        />
      </div>
    </div>
  );
}
