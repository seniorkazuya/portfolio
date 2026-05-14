/** Resume download: override with a full URL on Vercel, or use the file in /public. */
export function getResumeHref(): string {
  const fromEnv = process.env.NEXT_PUBLIC_RESUME_URL?.trim();
  if (fromEnv) return fromEnv;
  return "/Nakamura-Kazuya-Resume.pdf";
}
