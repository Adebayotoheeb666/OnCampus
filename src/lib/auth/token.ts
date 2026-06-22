import { createHmac, timingSafeEqual } from "crypto";

const SECRET = process.env.SESSION_SECRET ?? "oncampus-dev-secret";

export type ResidentSession = {
  type: "resident";
  tenantId: string;
  email: string;
};

export type AdminSession = {
  type: "admin";
  role: "super_admin" | "allocation_officer" | "finance_officer" | "facilities_staff" | "security_staff";
  email: string;
};

export type SponsorSession = {
  type: "sponsor";
  sponsorId: string;
  email: string;
};

export type Session = ResidentSession | AdminSession | SponsorSession;

function sign(data: string): string {
  return createHmac("sha256", SECRET).update(data).digest("base64url");
}

export function encodeSession(session: Session): string {
  const data = Buffer.from(JSON.stringify(session)).toString("base64url");
  return `${data}.${sign(data)}`;
}

export function decodeSession(token: string): Session | null {
  const [data, sig] = token.split(".");
  if (!data || !sig) return null;

  const expected = sign(data);
  try {
    if (!timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return null;
  } catch {
    return null;
  }

  try {
    return JSON.parse(Buffer.from(data, "base64url").toString()) as Session;
  } catch {
    return null;
  }
}
