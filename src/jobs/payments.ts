import { eq, and, sql, lte, gte } from "drizzle-orm";
import { db } from "@/db";
import { invoices, applicants, tenants } from "@/db/schema";
import { sendEmail } from "@/lib/notifications/email";

export async function paymentReminderCadence() {
  const now = new Date();
  const reminderDays = [7, 3, 1];

  for (const days of reminderDays) {
    const target = new Date(now);
    target.setDate(target.getDate() + days);
    const dayStart = new Date(target);
    dayStart.setHours(0, 0, 0, 0);
    const dayEnd = new Date(target);
    dayEnd.setHours(23, 59, 59, 999);

    const dueSoon = await db
      .select({
        invoice: invoices,
        email: applicants.email,
        name: applicants.fullName,
      })
      .from(invoices)
      .innerJoin(tenants, eq(invoices.tenantId, tenants.id))
      .innerJoin(applicants, eq(tenants.applicantId, applicants.id))
      .where(
        and(
          sql`${invoices.status} IN ('unpaid', 'partially_paid')`,
          gte(invoices.dueDate, dayStart),
          lte(invoices.dueDate, dayEnd),
        ),
      );

    for (const row of dueSoon) {
      await sendEmail({
        to: row.email,
        subject: `Rent reminder — due in ${days} day(s)`,
        html: `<p>Hi ${row.name},</p>
          <p>Your ${row.invoice.invoiceType} invoice is due on ${row.invoice.dueDate.toLocaleDateString("en-NG")}.</p>
          <p>Sign in to the resident portal to pay: ${process.env.NEXT_PUBLIC_APP_URL}/resident</p>`,
      });
    }
  }
}
