"use client";

import type { CustomMotion } from "@/lib/types";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import Link from "next/link";

import { getResumeHref } from "@/lib/env/resume-url";

import { Download, MessagesSquare, MousePointerClick } from "lucide-react";
import { m } from "@/components/motion-wrapper";

const BUTTONS_MOTION: CustomMotion<"div"> = {
  initial: { y: 10, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  viewport: { once: true },
  transition: { duration: 0.45, delay: 1.85 },
};

const buttonBaseClasses =
  "flex cursor-pointer items-center rounded-sm p-2 sm:p-3 text-base shrink-0 lg:text-lg transition-all duration-150 shadow-md font-medium";

export const HeroButtons = () => {
  const t = useTranslations("Hero");
  const resumeHref = getResumeHref();

  const handleClick = (section: string) => {
    const sectionEl = document.getElementById(section);
    if (!sectionEl) return;
    sectionEl?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <m.div {...BUTTONS_MOTION} className={cn("flex flex-wrap", "gap-4 sm:gap-6")}>
      <button
        onClick={() => handleClick("about-section")}
        className={cn(
          buttonBaseClasses,
          "bg-acc-yellow-2 text-darkest",
          "hover:bg-acc-yellow-3 sm:hover:-translate-y-1",
        )}
      >
        {t("begin")}
        <MousePointerClick className="ml-2 size-5 sm:size-7" />
      </button>

      <button
        onClick={() => handleClick("contact-section")}
        className={cn(
          buttonBaseClasses,
          "text-darkest/70 border-darkest/35 bg-white/50 border dark:text-off-w/60 dark:border-off-w/45 dark:bg-off-w/05",
          "hover:border-acc-red/60 hover:bg-acc-red/10 hover:text-acc-red sm:hover:-translate-y-1",
        )}
      >
        {t("contact")}

        <MessagesSquare className="ml-2 size-5 sm:size-7" />
      </button>

      <Link
        href={resumeHref}
        download
        className={cn(
          buttonBaseClasses,
          "text-darkest/70 border-darkest/35 bg-white/50 border dark:text-off-w/60 dark:border-off-w/45 dark:bg-off-w/05",
          "hover:border-acc-yellow-2/70 hover:bg-acc-yellow-2/12 hover:text-darkest sm:hover:-translate-y-1 dark:hover:text-off-w",
        )}
      >
        {t("resume")}
        <Download className="ml-2 size-5 sm:size-7" />
      </Link>
    </m.div>
  );
};
