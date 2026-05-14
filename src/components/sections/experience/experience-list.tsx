import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { EXPERIENCES } from "@/lib/content/experiences";
import { cn } from "@/lib/utils";
import { useSetAtom } from "jotai";
import { currentExperienceAtom, isExperienceOpenAtom } from "@/lib/store/experience";
import { LanguageCode } from "@/lib/constants/langs";

import { TextAnimate } from "@/components/ui/text-animate";
import { ExperienceLink } from "@/components/sections/experience/experience-link";
import { m } from "@/components/motion-wrapper";

const EXPERIENCE_BADGE_KEY: Record<string, string> = {
  "AI Square - AI Productivity & Content Platform": "aisquare",
  "LeapMind - Applied AI & NLP Systems": "leapmind",
  "Tokyo Techies - Enterprise Workflow AI": "tokyotechies_ai",
  "Yaraku - ML Research Internship": "yaraku",
  "Tokyo Techies - Frontend Product Engineering": "tokyotechies_web",
};

export const ExperienceList = () => {
  const t = useTranslations("Experience");
  const locale = useLocale() as LanguageCode;
  const setCurrentExperience = useSetAtom(currentExperienceAtom);
  const setIsExperienceOpen = useSetAtom(isExperienceOpenAtom);

  const openExperience = (experience: (typeof EXPERIENCES)[number]) => {
    const experienceSection = document.querySelector("#experience-section");
    if (experienceSection) experienceSection.scrollIntoView({ behavior: "instant" });
    setCurrentExperience(experience);
    setIsExperienceOpen(true);
  };

  return (
    <m.div
      key="main-experience"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
      className="flex flex-col items-center justify-center gap-12"
    >
      <div
        className={cn(
          "flex w-full flex-col items-start justify-between px-12",
          "lg:flex-row lg:items-end",
        )}
      >
        <div>
          <TextAnimate
            className={cn(
              "text-acc-red-dark text-6xl font-extrabold tracking-tight",
              "md:text-7xl",
            )}
            once
          >
            {t("title")}
          </TextAnimate>

          <TextAnimate
            className={cn("text-darkest/80 pt-4 text-xl font-light text-balance dark:text-acc-yellow-3")}
            once
            by="line"
            as="h2"
          >
            {t("description")}
          </TextAnimate>
        </div>

        <ExperienceLink
          title={t("check")}
          url="https://github.com/seniorkazuya"
          className={cn(
            "mt-4 self-start text-base font-medium",
            "sm:text-lg lg:mt-0 lg:self-end",
          )}
        />
      </div>

      <div
        className={cn(
          "relative w-full max-w-[1200px] px-2 sm:px-6",
        )}
      >
        <div className="from-black/10 via-black/20 to-black/10 absolute top-0 bottom-0 left-[17px] w-px bg-gradient-to-b dark:from-off-w/5 dark:via-off-w/25 dark:to-off-w/5 md:left-1/2 md:-translate-x-1/2" />

        <div className="flex flex-col gap-6 md:gap-8">
          {EXPERIENCES.map((experience, index) => (
            <article
              key={experience.title}
              className={cn(
                "relative ml-10 md:ml-0",
                "md:grid md:grid-cols-2 md:items-start md:gap-8",
              )}
            >
              <span
                className={cn(
                  "bg-acc-yellow-2 border-darkest absolute top-6 -left-10 z-10 size-3 rounded-full border-2 shadow-[0_0_0_3px_rgba(0,0,0,0.08)] dark:shadow-[0_0_0_3px_rgba(243,229,215,0.15)]",
                  "md:left-1/2 md:-translate-x-1/2",
                )}
              />

              <div
                className={cn(
                  "md:col-span-1",
                  index % 2 === 0 ? "md:pr-10 md:text-right" : "md:order-2 md:pl-10 md:text-left",
                )}
              >
                <p className="text-acc-yellow-2 text-xs font-semibold tracking-wide uppercase">
                  {experience.period}
                </p>
                <h3 className="text-darkest mt-1 text-xl font-extrabold tracking-tight dark:text-off-w md:text-2xl">
                  {experience.company}
                </h3>
                <p className="text-darkest/75 text-sm font-medium dark:text-off-w/75">{experience.role}</p>
                <p className="text-darkest/60 text-xs dark:text-off-w/60">{experience.location}</p>
              </div>

              <button
                onClick={() => openExperience(experience)}
                className={cn(
                  "group border-black/10 bg-white/75 hover:border-acc-yellow-3/65 relative mt-3 w-full cursor-pointer overflow-hidden rounded-sm border p-5 text-left shadow-[0_14px_35px_rgba(0,0,0,0.12)] transition-all duration-250 dark:border-off-w/15 dark:bg-black/60 dark:shadow-[0_14px_35px_rgba(0,0,0,0.32)]",
                  "hover:-translate-y-1 hover:shadow-[0_22px_45px_rgba(0,0,0,0.45)] md:mt-0 md:col-span-1",
                  index % 2 === 0 ? "md:order-2 md:pl-10" : "md:pr-10",
                )}
              >
                <div className="from-acc-yellow-2/25 via-acc-red/10 to-transparent pointer-events-none absolute inset-0 bg-gradient-to-br opacity-70" />
                <div className="relative z-10">
                  <div className="mb-3 flex flex-wrap gap-2">
                    {(
                      t.raw(
                        `badges.${EXPERIENCE_BADGE_KEY[experience.title ?? ""] ?? "default"}`,
                      ) as string[]
                    ).map((badge) => (
                      <span
                        key={`${experience.title}-${badge}`}
                        className="border-black/15 text-darkest/90 bg-black/5 rounded-full border px-2.5 py-1 text-[0.65rem] font-semibold tracking-wide uppercase dark:border-off-w/25 dark:text-off-w/90 dark:bg-off-w/8"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>

                  <h4 className="text-darkest group-hover:text-acc-yellow-2 dark:text-off-w text-base font-bold tracking-tight md:text-lg">
                    {experience.title}
                  </h4>
                  <p className="text-darkest/80 mt-2 text-sm leading-6 dark:text-off-w/80">
                    {experience.description[locale]}
                  </p>
                  <p className="text-[#9a2f2f] mt-3 text-xs font-semibold tracking-wide uppercase dark:text-acc-red">
                    {t("view")}
                  </p>
                </div>
              </button>
            </article>
          ))}
        </div>
      </div>
    </m.div>
  );
};
