import Image from "next/image";
import { cn } from "@/lib/utils";

const LOGO = "/logos/staunch-logo.png";
const LOGO_WIDTH = 1024;
const LOGO_HEIGHT = 624;

type BlendBackground = "bg" | "surface";

interface LogoProps {
  className?: string;
  variant?: "full" | "oxen" | "wordmark";
  blendWith?: BlendBackground;
  wordmarkClassName?: string;
  oxenClassName?: string;
}

export function Logo({
  className,
  wordmarkClassName,
}: LogoProps) {
  return (
    <span className={cn("inline-block shrink-0", className)}>
      <Image
        src={LOGO}
        alt="Staunch"
        width={LOGO_WIDTH}
        height={LOGO_HEIGHT}
        className={cn("block h-10 w-auto sm:h-12", wordmarkClassName)}
        priority
      />
    </span>
  );
}

export function HeroLogoStack({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <Image
        src={LOGO}
        alt="Staunch"
        width={LOGO_WIDTH}
        height={LOGO_HEIGHT}
        className="h-auto w-full max-w-[240px] sm:max-w-[320px]"
        priority
      />
    </div>
  );
}
