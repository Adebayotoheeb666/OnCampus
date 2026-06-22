"use server";

import { redirect } from "next/navigation";
import { getTenantByApplicantLookup } from "@/modules/allocation/queries";
import {
  setResidentSession,
  setAdminSession,
  setSponsorSession,
  clearResidentSession,
  clearAdminSession,
  clearSponsorSession,
} from "@/lib/auth/session";
import { verifySponsorOtp } from "@/modules/auth/otp";

export async function loginResident(email: string, matricOrJambNo: string) {
  const row = await getTenantByApplicantLookup(email, matricOrJambNo);
  if (!row) {
    return { success: false as const, error: "No active tenancy found for these details." };
  }

  await setResidentSession({
    type: "resident",
    tenantId: row.tenant.id,
    email,
  });

  return { success: true as const };
}

export async function loginAdmin(email: string, password: string) {
  const adminPassword = process.env.ADMIN_PASSWORD ?? "admin123";
  const adminEmail = process.env.ADMIN_EMAIL ?? "admin@oncampus.ng";

  if (email !== adminEmail || password !== adminPassword) {
    return { success: false as const, error: "Invalid credentials." };
  }

  await setAdminSession({
    type: "admin",
    role: "super_admin",
    email,
  });

  return { success: true as const };
}

export async function logoutResident() {
  await clearResidentSession();
  redirect("/resident");
}

export async function logoutAdmin() {
  await clearAdminSession();
  redirect("/admin/login");
}

export async function loginSponsorWithOtp(email: string, code: string) {
  const result = await verifySponsorOtp(email, code);
  if (!result.success) return result;

  await setSponsorSession({
    type: "sponsor",
    sponsorId: result.sponsorId,
    email: result.email,
  });

  return { success: true as const };
}

export async function logoutSponsor() {
  await clearSponsorSession();
  redirect("/sponsor/portal");
}
