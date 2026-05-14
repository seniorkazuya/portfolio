import { SiGithub } from "@icons-pack/react-simple-icons";
import { Socials } from "@/lib/types";

export const SOCIAL_LINKS: Socials<"github"> = {
  github: {
    href: "https://github.com/seniorkazuya",
    icon: SiGithub,
    text: "GitHub",
  },
} as const;
