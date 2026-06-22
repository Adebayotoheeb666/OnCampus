import { task } from "@trigger.dev/sdk/v3";
import { generateSponsorCertificateJob } from "@/modules/sponsor/certificate";
import { paymentReminderCadence } from "@/jobs/payments";
import { maintenanceSLAEscalation } from "@/jobs/resident";

export const generateSponsorCertificate = task({
  id: "generate-sponsor-certificate",
  run: async (payload: { pledgeId: string }) => {
    await generateSponsorCertificateJob(payload.pledgeId);
  },
});

export const paymentReminderCadenceTask = task({
  id: "payment-reminder-cadence",
  run: async () => {
    await paymentReminderCadence();
  },
});

export const maintenanceSlaEscalationTask = task({
  id: "maintenance-sla-escalation",
  run: async () => {
    await maintenanceSLAEscalation();
  },
});
