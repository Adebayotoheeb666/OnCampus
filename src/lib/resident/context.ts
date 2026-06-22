import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { tenants, applicants, beds, rooms, blocks } from "@/db/schema";
import { getResidentSession } from "@/lib/auth/session";

export async function requireResidentContext() {
  const session = await getResidentSession();
  if (!session) redirect("/resident");

  const [row] = await db
    .select({
      tenant: tenants,
      applicant: applicants,
      bedLabel: beds.bedLabel,
      blockName: blocks.name,
      roomNumber: rooms.roomNumber,
    })
    .from(tenants)
    .innerJoin(applicants, eq(tenants.applicantId, applicants.id))
    .innerJoin(beds, eq(tenants.bedId, beds.id))
    .innerJoin(rooms, eq(beds.roomId, rooms.id))
    .innerJoin(blocks, eq(rooms.blockId, blocks.id))
    .where(eq(tenants.id, session.tenantId))
    .limit(1);

  if (!row) redirect("/resident");

  return { session, ...row };
}
