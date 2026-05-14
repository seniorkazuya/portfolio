"use server";

import { Resend } from "resend";
import { EmailFormSchema } from "@/lib/validations/form";
import { EmailTemplate } from "@/components/email-template";
import { DEV_TURNSTILE_BYPASS_TOKEN } from "@/lib/constants/turnstile-dev";

const resend = new Resend(process.env.RESEND_API_KEY);

const VERIFY_ENDPOINT = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

const SECRET_KEY =
  process.env.NODE_ENV === "production"
    ? (
        process.env.CLOUDFLARE_TURNSTILE_SECRET?.trim() ||
        process.env.TURNSTILE_SECRET_KEY?.trim()
      )
    : "1x0000000000000000000000000000000AA";

export async function sendEmail(formData: EmailFormSchema, token: string) {
  try {
    const isLocalDev = process.env.NODE_ENV === "development";

    if (isLocalDev && token === DEV_TURNSTILE_BYPASS_TOKEN) {
      // Avoid loading Cloudflare Turnstile in `next dev` (iframe CSP / preload console noise).
    } else {
      if (!SECRET_KEY) {
        console.error("Turnstile: CLOUDFLARE_TURNSTILE_SECRET is not set in production.");
        return false;
      }
      const verifyRes = await fetch(VERIFY_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `secret=${SECRET_KEY}&response=${token}`,
      });

      const verification = await verifyRes.json();

      if (!verification.success) {
        console.error("Turnstile verification failed:", verification["error-codes"]);
        return false;
      }
    }

    const { data, error } = await resend.emails.send({
      from: `${formData.name} <onboarding@resend.dev>`,
      to: ["nakamura.kz@gmail.com"],
      subject: "Contact - Nakamura.page",
      text: formData.message,
      react: await EmailTemplate({
        firstName: formData.name,
        email: formData.email,
        message: formData.message,
      }),
    });

    if (error) {
      console.error("Email send error:", error);
      throw new Error("Failed to send email");
    }

    return data;
  } catch (err) {
    console.error("Form submission error:", err);
    throw new Error("Failed to submit form");
  }
}
