import { generateSponsorCertificateJob } from "@/modules/sponsor/certificate";
import { dispatchGenerateSponsorCertificate } from "@/lib/jobs/dispatch";

export async function generateSponsorCertificate(pledgeId: string) {
  await dispatchGenerateSponsorCertificate(pledgeId);
}

export { generateSponsorCertificateJob };

export async function sendImpactUpdate() {
  console.log("[job] sendImpactUpdate — schedule via Trigger.dev cron");
}

export async function recurringPledgeReminder() {
  console.log("[job] recurringPledgeReminder — schedule via Trigger.dev cron");
}

export async function reconcileFailedPayments() {
  console.log("[job] reconcileFailedPayments — schedule via Trigger.dev cron");
}
