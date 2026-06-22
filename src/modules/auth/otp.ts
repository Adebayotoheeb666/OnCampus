"use server";

import { nanoid } from "nanoid";
import { eq, and, gt, isNull } from "drizzle-orm";
import { db } from "@/db";
import { otpCodes, sponsors } from "@/db/schema";
import { sendOtpEmail } from "@/lib/notifications/email";

function generateOtpCode(): string {
  return String(Math.floor(100000 + Math.random() * 900000));
}

export async function requestSponsorOtp(email: string) {
  const normalized = email.trim().toLowerCase();
  if (!normalized.includes("@")) {
    return { success: false as const, error: "Enter a valid email address" };
  }

  const [sponsor] = await db
    .select()
    .from(sponsors)
    .where(eq(sponsors.email, normalized))
    .limit(1);

  if (!sponsor) {
    return {
      success: false as const,
      error: "No sponsor account found for this email. Complete a sponsorship checkout first.",
    };
  }

  const code = generateOtpCode();
  const now = new Date();
  const expiresAt = new Date(now.getTime() + 10 * 60 * 1000);

  await db.insert(otpCodes).values({
    id: `otp_${nanoid(12)}`,
    email: normalized,
    code,
    purpose: "sponsor_login",
    expiresAt,
    createdAt: now,
  });

  await sendOtpEmail(normalized, code);

  return { success: true as const, devCode: process.env.RESEND_API_KEY ? undefined : code };
}

export async function verifySponsorOtp(email: string, code: string) {
  const normalized = email.trim().toLowerCase();
  const now = new Date();

  const [otp] = await db
    .select()
    .from(otpCodes)
    .where(
      and(
        eq(otpCodes.email, normalized),
        eq(otpCodes.code, code.trim()),
        eq(otpCodes.purpose, "sponsor_login"),
        isNull(otpCodes.usedAt),
        gt(otpCodes.expiresAt, now),
      ),
    )
    .limit(1);

  if (!otp) {
    return { success: false as const, error: "Invalid or expired code" };
  }

  const [sponsor] = await db
    .select()
    .from(sponsors)
    .where(eq(sponsors.email, normalized))
    .limit(1);

  if (!sponsor) {
    return { success: false as const, error: "Sponsor not found" };
  }

  await db.update(otpCodes).set({ usedAt: now }).where(eq(otpCodes.id, otp.id));

  return { success: true as const, sponsorId: sponsor.id, email: normalized };
}
