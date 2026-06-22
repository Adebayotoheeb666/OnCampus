import Link from "next/link";
import { Card, CardTitle } from "@/components/ui/card";
import { ApplicationStatusLookup } from "@/components/allocation/application-status-lookup";
import {
  lookupApplicant,
  getApplicantAuditTrail,
  getTenantByApplicantLookup,
} from "@/modules/allocation/queries";

type SearchParams = Promise<{ reference?: string; email?: string; matricOrJambNo?: string }>;

const STATUS_STEPS = ["submitted", "under_review", "allocated", "waitlisted", "rejected"] as const;

export default async function ApplicationStatusPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const applicant = params.reference || (params.email && params.matricOrJambNo)
    ? await lookupApplicant({
        reference: params.reference,
        email: params.email,
        matricOrJambNo: params.matricOrJambNo,
      })
    : null;

  const auditTrail = applicant ? await getApplicantAuditTrail(applicant.id) : [];
  const tenantInfo =
    applicant?.status === "allocated"
      ? await getTenantByApplicantLookup(applicant.email, applicant.matricOrJambNo)
      : null;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold">Application status</h1>
      <p className="mt-2 text-stone-600">Look up your application using your reference number or email.</p>

      <div className="mt-8">
        <ApplicationStatusLookup />
      </div>

      {applicant && (
        <div className="mt-8 space-y-6">
          <Card>
            <CardTitle>{applicant.fullName}</CardTitle>
            <p className="mt-1 text-sm text-stone-500">Reference: {applicant.id}</p>
            <p className="mt-4 text-lg font-semibold capitalize text-emerald-800">
              Status: {applicant.status?.replace("_", " ")}
            </p>
            {applicant.needScore !== null && (
              <p className="text-sm text-stone-600">Need score: {applicant.needScore}</p>
            )}
          </Card>

          <Card>
            <CardTitle>Timeline</CardTitle>
            <ol className="mt-4 space-y-3">
              {STATUS_STEPS.map((step) => {
                const logEntry = auditTrail.find((l) =>
                  step === "under_review" ? l.action === "scored" : l.action === step,
                );
                const isActive = applicant.status === step;
                const isPast =
                  STATUS_STEPS.indexOf(step) <=
                  STATUS_STEPS.indexOf(applicant.status as (typeof STATUS_STEPS)[number]);
                return (
                  <li key={step} className={`flex gap-3 text-sm ${isPast || isActive ? "text-stone-900" : "text-stone-400"}`}>
                    <span className={`mt-0.5 h-2 w-2 shrink-0 rounded-full ${isPast ? "bg-emerald-600" : "bg-stone-300"}`} />
                    <div>
                      <p className="font-medium capitalize">{step.replace("_", " ")}</p>
                      {logEntry && (
                        <p className="text-xs text-stone-500">
                          {logEntry.createdAt.toLocaleString("en-NG")} — {logEntry.notes}
                        </p>
                      )}
                    </div>
                  </li>
                );
              })}
            </ol>
          </Card>

          {tenantInfo && (
            <Card>
              <CardTitle>Allocation details</CardTitle>
              <p className="mt-2 text-sm">
                {tenantInfo.blockName} · Room {tenantInfo.roomNumber} · Bed {tenantInfo.bedLabel}
              </p>
              <p className="mt-2 text-sm text-stone-600">
                Session: {tenantInfo.tenant.sessionStart.toLocaleDateString("en-NG")} –{" "}
                {tenantInfo.tenant.sessionEnd.toLocaleDateString("en-NG")}
              </p>
              {applicant.applicationType === "paid_bed" && (
                <Link href={`/resident/dashboard?email=${encodeURIComponent(applicant.email)}&matricOrJambNo=${encodeURIComponent(applicant.matricOrJambNo)}`} className="mt-3 inline-block text-sm font-medium text-emerald-800 hover:underline">
                  View rent invoices →
                </Link>
              )}
            </Card>
          )}

          <p className="text-sm text-stone-500">
            <Link href="/apply" className="text-emerald-800 hover:underline">Submit a new application</Link>
          </p>
        </div>
      )}
    </div>
  );
}
