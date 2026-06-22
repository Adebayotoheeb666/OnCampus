import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { sponsors } from "@/db/schema";
import { getSponsorSession } from "@/lib/auth/session";

export async function requireSponsorContext() {
  const session = await getSponsorSession();
  if (!session) redirect("/sponsor/portal");

  const [sponsor] = await db
    .select()
    .from(sponsors)
    .where(eq(sponsors.id, session.sponsorId))
    .limit(1);

  if (!sponsor) redirect("/sponsor/portal");

  return { session, sponsor };
}
