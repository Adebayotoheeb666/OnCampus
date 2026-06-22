import { eq, desc, gte, and } from "drizzle-orm";
import { generateSponsorCertificateJob } from "@/modules/sponsor/certificate";
import { dispatchGenerateSponsorCertificate } from "@/lib/jobs/dispatch";
import { db } from "@/db";
import { sponsorshipPledges, sponsors, impactStories } from "@/db/schema";
import { sendEmail } from "@/lib/notifications/email";

export async function generateSponsorCertificate(pledgeId: string) {
  await dispatchGenerateSponsorCertificate(pledgeId);
}

export { generateSponsorCertificateJob };

export async function sendImpactUpdate() {
  // Get sponsors who have given consent
  const sponsorsWithConsent = await db
    .selectDistinct({ sponsorId: sponsorshipPledges.sponsorId })
    .from(sponsorshipPledges)
    .innerJoin(sponsors, eq(sponsorshipPledges.sponsorId, sponsors.id))
    .where(
      and(
        eq(sponsors.status, "active"),
        eq(sponsorshipPledges.status, "fulfilled"),
      ),
    );

  // Get recent impact stories (published this month)
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  
  const recentStories = await db
    .select()
    .from(impactStories)
    .where(
      and(
        eq(impactStories.consentGranted, true),
        gte(impactStories.publishedAt, monthStart),
      ),
    )
    .orderBy(desc(impactStories.publishedAt))
    .limit(5);

  if (recentStories.length === 0) return;

  // Send to each sponsor
  for (const { sponsorId } of sponsorsWithConsent) {
    const [sponsor] = await db
      .select()
      .from(sponsors)
      .where(eq(sponsors.id, sponsorId));

    if (!sponsor) continue;

    const storiesHtml = recentStories
      .map((s) => `<li><strong>${s.title}</strong>: ${s.excerpt?.substring(0, 100)}...</li>`)
      .join("");

    await sendEmail({
      to: sponsor.email,
      subject: "Your impact: Stories from OnCampus residents",
      html: `<p>Hi ${sponsor.fullName},</p>
        <p>Here are recent stories from residents you've helped sponsor:</p>
        <ul>${storiesHtml}</ul>
        <p><a href="${process.env.NEXT_PUBLIC_APP_URL}/impact">View all stories</a></p>`,
    });
  }
}

export async function recurringPledgeReminder() {
  const now = new Date();
  
  // Find recurring pledges where annual renewal is due (or close)
  const recurringPledges = await db
    .select({
      pledge: sponsorshipPledges,
      sponsor: sponsors,
    })
    .from(sponsorshipPledges)
    .innerJoin(sponsors, eq(sponsorshipPledges.sponsorId, sponsors.id))
    .where(
      and(
        eq(sponsorshipPledges.recurring, true),
        eq(sponsorshipPledges.status, "fulfilled"),
      ),
    );

  for (const { pledge, sponsor } of recurringPledges) {
    // Calculate days until next renewal (assuming yearly for now)
    const createdTime = pledge.createdAt.getTime();
    const nextRenewalTime = createdTime + 365 * 24 * 60 * 60 * 1000;
    const daysUntilRenewal = Math.round((nextRenewalTime - now.getTime()) / (1000 * 60 * 60 * 24));

    // Send reminders at 30, 14, and 3 days
    if ([30, 14, 3].includes(daysUntilRenewal)) {
      await sendEmail({
        to: sponsor.email,
        subject: `Recurring sponsorship renewal in ${daysUntilRenewal} day(s)`,
        html: `<p>Hi ${sponsor.fullName},</p>
          <p>Your annual sponsorship pledge renewal will be due in ${daysUntilRenewal} day(s).</p>
          <p><a href="${process.env.NEXT_PUBLIC_APP_URL}/sponsor/portal">Renew your sponsorship</a></p>`,
      });
    }
  }
}

export async function reconcileFailedPayments() {
  // This would handle retrying failed payment transactions
  // For now, a placeholder for future implementation
  console.log("[job] reconcileFailedPayments — querying for payment failures");
}
