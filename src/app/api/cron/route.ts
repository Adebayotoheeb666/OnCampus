import { NextResponse } from "next/server";
import { dispatchPaymentReminderCadence, dispatchMaintenanceSlaEscalation } from "@/lib/jobs/dispatch";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const job = searchParams.get("job");

  if (job === "payment-reminders") {
    await dispatchPaymentReminderCadence();
    return NextResponse.json({ ok: true, job });
  }

  if (job === "maintenance-sla") {
    await dispatchMaintenanceSlaEscalation();
    return NextResponse.json({ ok: true, job });
  }

  await Promise.all([
    dispatchPaymentReminderCadence(),
    dispatchMaintenanceSlaEscalation(),
  ]);

  return NextResponse.json({ ok: true, jobs: ["payment-reminders", "maintenance-sla"] });
}
