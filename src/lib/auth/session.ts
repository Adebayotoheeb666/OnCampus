import { cookies } from "next/headers";
import {
  encodeSession,
  decodeSession,
  type ResidentSession,
  type AdminSession,
  type SponsorSession,
  type Session,
} from "@/lib/auth/token";

export type { ResidentSession, AdminSession, SponsorSession, Session };

const RESIDENT_COOKIE = "oncampus_resident";
const ADMIN_COOKIE = "oncampus_admin";
const SPONSOR_COOKIE = "oncampus_sponsor";

export async function getResidentSession(): Promise<ResidentSession | null> {
  const jar = await cookies();
  const token = jar.get(RESIDENT_COOKIE)?.value;
  if (!token) return null;
  const session = decodeSession(token);
  return session?.type === "resident" ? session : null;
}

export async function getAdminSession(): Promise<AdminSession | null> {
  const jar = await cookies();
  const token = jar.get(ADMIN_COOKIE)?.value;
  if (!token) return null;
  const session = decodeSession(token);
  return session?.type === "admin" ? session : null;
}

export async function setResidentSession(session: ResidentSession) {
  const jar = await cookies();
  jar.set(RESIDENT_COOKIE, encodeSession(session), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function setAdminSession(session: AdminSession) {
  const jar = await cookies();
  jar.set(ADMIN_COOKIE, encodeSession(session), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
}

export async function clearResidentSession() {
  const jar = await cookies();
  jar.delete(RESIDENT_COOKIE);
}

export async function clearAdminSession() {
  const jar = await cookies();
  jar.delete(ADMIN_COOKIE);
}

export async function getSponsorSession(): Promise<SponsorSession | null> {
  const jar = await cookies();
  const token = jar.get(SPONSOR_COOKIE)?.value;
  if (!token) return null;
  const session = decodeSession(token);
  return session?.type === "sponsor" ? session : null;
}

export async function setSponsorSession(session: SponsorSession) {
  const jar = await cookies();
  jar.set(SPONSOR_COOKIE, encodeSession(session), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}

export async function clearSponsorSession() {
  const jar = await cookies();
  jar.delete(SPONSOR_COOKIE);
}
