import { task } from "@trigger.dev/sdk/v3";
import { generateSponsorCertificateJob } from "@/modules/sponsor/certificate";
import { paymentReminderCadence } from "@/jobs/payments";
import { maintenanceSLAEscalation } from "@/jobs/resident";
import { sendImpactUpdate, recurringPledgeReminder } from "@/jobs/sponsor";
import { runAllocationCycle } from "@/modules/allocation/actions";
import { getTenantsNearingCheckout } from "@/modules/allocation/queries";
import { sendEmail } from "@/lib/notifications/email";

// On-demand: Generate sponsor certificate when pledge is fulfilled
export const generateSponsorCertificate = task({
  id: "generate-sponsor-certificate",
  run: async (payload: { pledgeId: string }) => {
    await generateSponsorCertificateJob(payload.pledgeId);
  },
});

// Scheduled: Send payment reminders (configure in Trigger.dev dashboard)
export const paymentReminderCadenceTask = task({
  id: "payment-reminder-cadence",
  run: async () => {
    await paymentReminderCadence();
  },
});

// Scheduled: Escalate maintenance requests past SLA (configure in Trigger.dev dashboard)
export const maintenanceSlaEscalationTask = task({
  id: "maintenance-sla-escalation",
  run: async () => {
    await maintenanceSLAEscalation();
  },
});

// Scheduled: Send monthly impact updates to sponsors (configure in Trigger.dev dashboard)
export const sendImpactUpdateTask = task({
  id: "send-impact-update",
  run: async () => {
    await sendImpactUpdate();
  },
});

// Scheduled: Send recurring pledge reminders (configure in Trigger.dev dashboard)
export const recurringPledgeReminderTask = task({
  id: "recurring-pledge-reminder",
  run: async () => {
    await recurringPledgeReminder();
  },
});

// Scheduled: Run batch allocation cycle (configure in Trigger.dev dashboard)
export const runAllocationCycleTask = task({
  id: "run-allocation-cycle",
  run: async () => {
    const results = await runAllocationCycle();
    const allocated = results.filter((r) => r.bedId).length;
    const failed = results.filter((r) => r.error).length;
    
    await sendEmail({
      to: process.env.ADMIN_EMAIL ?? "admin@oncampus.ng",
      subject: "[OnCampus] Allocation cycle completed",
      html: `<p>Weekly allocation cycle results:</p>
        <ul>
          <li>Allocated: ${allocated}</li>
          <li>Failed: ${failed}</li>
          <li>Total processed: ${results.length}</li>
        </ul>`,
    });
  },
});

// Scheduled: Check out reminders for tenants (configure in Trigger.dev dashboard)
export const checkoutReminderTask = task({
  id: "checkout-reminder",
  run: async () => {
    const nearingCheckout = await getTenantsNearingCheckout(15);
    
    for (const { tenant, applicantName, applicantEmail, bedLabel, blockName } of nearingCheckout) {
      await sendEmail({
        to: applicantEmail,
        subject: "Your session is ending soon — checkout reminder",
        html: `<p>Hi ${applicantName},</p>
          <p>Your current session in ${blockName} Bed ${bedLabel} ends on ${tenant.sessionEnd.toLocaleDateString("en-NG")}.</p>
          <p>Please start the checkout process in the resident portal: ${process.env.NEXT_PUBLIC_APP_URL}/resident</p>`,
      });
    }
  },
});
