import { sql, and, lt } from "drizzle-orm";
import { db } from "@/db";
import { maintenanceRequests } from "@/db/schema";
import { sendEmail } from "@/lib/notifications/email";

const SLA_HOURS = 48;

export async function maintenanceSLAEscalation() {
  const cutoff = new Date(Date.now() - SLA_HOURS * 60 * 60 * 1000);

  const overdue = await db
    .select()
    .from(maintenanceRequests)
    .where(
      and(
        sql`${maintenanceRequests.status} != 'resolved'`,
        lt(maintenanceRequests.createdAt, cutoff),
      ),
    );

  if (overdue.length === 0) return;

  const adminEmail = process.env.ADMIN_EMAIL ?? "admin@oncampus.ng";
  await sendEmail({
    to: adminEmail,
    subject: `[OnCampus] ${overdue.length} maintenance request(s) past SLA`,
    html: `<p>The following maintenance requests are unresolved after ${SLA_HOURS} hours:</p>
      <ul>${overdue.map((r) => `<li>${r.id} — ${r.category} (${r.priority})</li>`).join("")}</ul>`,
  });
}
