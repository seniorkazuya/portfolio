/** Public site key for Cloudflare Turnstile (supports common Vercel env names). */
export function getTurnstileSiteKey(): string | undefined {
  const fromPrimary = process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE?.trim();
  const fromLegacy = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim();
  return fromPrimary || fromLegacy || undefined;
}
