import { cn } from "@/lib/utils";

import Image from "next/image";
import AnimatedGradientBackground from "@/components/ui/animated-gradient-background";
import { HeroButtons } from "@/components/sections/hero/hero-buttons";
import { HeroText } from "./hero-text";

const STATIC_COLOR = "#f3e5d7";
const MID_COLOR = "#f3e5d744";
const DARK_COLOR = "#00000033";

const imageBaseClasses = "pointer-events-none absolute";

export default function HeroSection() {
  return (
    <section
      id="hero-section"
      className={cn(
        "relative flex min-h-dvh flex-col items-center justify-center overflow-hidden",
        "xs:px-12 px-8",
      )}
    >
      {/* Hero Content */}
      <div className="relative z-30 flex w-full max-w-[700px] flex-col gap-y-16 px-5 py-6 sm:px-7 sm:py-8 lg:max-w-[1100px]">
        {/* Text Content */}
        <HeroText />

        {/* Call to Action Buttons */}
        <HeroButtons />
      </div>

      {/* Background */}
      <Image
        src="/images/kanagawa.avif"
        alt="Kanagawa Wave"
        className={cn(
          imageBaseClasses,
          "kanagawa-animation bottom-0 z-20 w-full opacity-26 sepia saturate-75 dark:opacity-18 dark:saturate-100",
        )}
        loading="eager"
        priority
        quality={65}
        width={1900}
        height={443}
        sizes="100vw"
      />
      <Image
        src="/images/pagoda.avif"
        alt="Pagoda"
        className={cn(
          imageBaseClasses,
          "pagoda-animation -bottom-40 opacity-15 saturate-75 [mask-image:linear-gradient(to_bottom,black_30%,transparent_88%)] [-webkit-mask-image:linear-gradient(to_bottom,black_30%,transparent_88%)] dark:opacity-28 dark:saturate-100",
          "max-md:hidden md:max-2xl:-bottom-0",
        )}
        loading="eager"
        priority
        quality={65}
        width={1920}
        height={1080}
        sizes="(max-width: 1024px) 0vw, 100vw"
      />

      {/* Gradient Background */}
      <AnimatedGradientBackground
        gradientStops={[45, 75, 100]}
        gradientColors={[DARK_COLOR, MID_COLOR, STATIC_COLOR]}
      />
    </section>
  );
}
