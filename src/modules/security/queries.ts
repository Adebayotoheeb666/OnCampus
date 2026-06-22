import { eq, desc } from "drizzle-orm";
import { db } from "@/db";
import { accessLogs, incidents, visitorLogs } from "@/db/schema";
import { applicants, tenants } from "@/db/schema";

export async function getAccessLogs(limit = 50) {
  return db.select().from(accessLogs).orderBy(desc(accessLogs.timestamp)).limit(limit);
}

export async function getIncidents() {
  return db.select().from(incidents).orderBy(desc(incidents.createdAt));
}

export async function searchExpectedVisitors(query: string) {
  const rows = await db.select().from(visitorLogs).where(eq(visitorLogs.status, "expected"));
  const q = query.toLowerCase();
  return rows.filter(
    (v) =>
      v.visitorName.toLowerCase().includes(q) ||
      (v.visitorPhone?.toLowerCase().includes(q) ?? false),
  );
}

export async function getTenantById(tenantId: string) {
  const [row] = await db
    .select({
      tenant: tenants,
      name: applicants.fullName,
    })
    .from(tenants)
    .innerJoin(applicants, eq(tenants.applicantId, applicants.id))
    .where(eq(tenants.id, tenantId))
    .limit(1);
  return row ?? null;
}
