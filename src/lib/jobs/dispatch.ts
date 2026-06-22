/**
 * Dispatch background jobs via Trigger.dev when configured, otherwise run inline.
 */

export async function dispatchGenerateSponsorCertificate(pledgeId: string) {
  if (process.env.TRIGGER_SECRET_KEY) {
    try {
      const { tasks } = await import("@trigger.dev/sdk/v3");
      await tasks.trigger("generate-sponsor-certificate", { pledgeId });
      return;
    } catch (error) {
      console.error("Trigger.dev dispatch failed, falling back to inline:", error);
    }
  }

  const { generateSponsorCertificateJob } = await import("@/modules/sponsor/certificate");
  await generateSponsorCertificateJob(pledgeId);
}

export async function dispatchPaymentReminderCadence() {
  if (process.env.TRIGGER_SECRET_KEY) {
    try {
      const { tasks } = await import("@trigger.dev/sdk/v3");
      await tasks.trigger("payment-reminder-cadence", {});
      return;
    } catch (error) {
      console.error("Trigger.dev dispatch failed:", error);
    }
  }
  const { paymentReminderCadence } = await import("@/jobs/payments");
  await paymentReminderCadence();
}

export async function dispatchMaintenanceSlaEscalation() {
  if (process.env.TRIGGER_SECRET_KEY) {
    try {
      const { tasks } = await import("@trigger.dev/sdk/v3");
      await tasks.trigger("maintenance-sla-escalation", {});
      return;
    } catch (error) {
      console.error("Trigger.dev dispatch failed:", error);
    }
  }
  const { maintenanceSLAEscalation } = await import("@/jobs/resident");
  await maintenanceSLAEscalation();
}
