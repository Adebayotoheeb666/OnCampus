"use server";

import { nanoid } from "nanoid";
import { eq, and, inArray, isNull, or } from "drizzle-orm";
import { db } from "@/db";
import {
  applicants,
  tenants,
  beds,
  allocationAuditLog,
  auditLog,
} from "@/db/schema";
import { applicationSchema } from "@/lib/validations/allocation";
import { computeNeedScore } from "@/lib/allocation/scoring";
import { SESSION_MONTHS } from "@/lib/constants";
import { generateInvoicesForTenant } from "@/modules/payments/actions";

export type SubmitApplicationResult =
  | { success: true; reference: string }
  | { success: false; error: string };

export async function submitApplication(input: unknown): Promise<SubmitApplicationResult> {
  const parsed = applicationSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: parsed.error.errors[0]?.message ?? "Invalid input" };
  }

  const data = parsed.data;
  const now = new Date();
  const applicantId = `app_${nanoid(12)}`;

  let needScore: number | null = null;
  let needAssessmentJson: string | null = null;

  if (data.applicationType === "free_bed" && data.needAssessment) {
    needScore = computeNeedScore(data.needAssessment);
    needAssessmentJson = JSON.stringify(data.needAssessment);
  }

  try {
    await db.insert(applicants).values({
      id: applicantId,
      fullName: data.fullName,
      matricOrJambNo: data.matricOrJambNo,
      level: data.level,
      gender: data.gender,
      phone: data.phone,
      email: data.email,
      stateOfOrigin: data.stateOfOrigin ?? null,
      needScore,
      needAssessmentJson,
      applicationType: data.applicationType,
      status: "submitted",
      createdAt: now,
    });

    if (needScore !== null) {
      await db.insert(allocationAuditLog).values({
        id: `alog_${nanoid(12)}`,
        applicantId,
        action: "scored",
        performedBy: "system",
        notes: `Automated need score: ${needScore}`,
        createdAt: now,
      });
    }

    return { success: true, reference: applicantId };
  } catch (error) {
    console.error("Application submit error:", error);
    return { success: false, error: "Could not submit application. Please try again." };
  }
}

export async function updateApplicantStatus(
  applicantId: string,
  status: "under_review" | "rejected" | "waitlisted",
  notes: string,
  performedBy = "admin",
) {
  const now = new Date();
  const actionMap = {
    under_review: "scored" as const,
    rejected: "rejected" as const,
    waitlisted: "waitlisted" as const,
  };

  await db.update(applicants).set({ status }).where(eq(applicants.id, applicantId));

  await db.insert(allocationAuditLog).values({
    id: `alog_${nanoid(12)}`,
    applicantId,
    action: actionMap[status],
    performedBy,
    notes,
    createdAt: now,
  });
}

export async function allocateApplicant(
  applicantId: string,
  bedId: string,
  notes: string,
  performedBy = "admin",
) {
  const [applicant] = await db
    .select()
    .from(applicants)
    .where(eq(applicants.id, applicantId))
    .limit(1);

  if (!applicant) throw new Error("Applicant not found");
  if (applicant.status === "allocated") throw new Error("Already allocated");

  const [bed] = await db.select().from(beds).where(eq(beds.id, bedId)).limit(1);
  if (!bed) throw new Error("Bed not found");
  if (bed.currentTenantId) throw new Error("Bed is already occupied");

  const now = new Date();
  const sessionEnd = new Date(now);
  sessionEnd.setMonth(sessionEnd.getMonth() + SESSION_MONTHS);

  const tenantId = `tenant_${nanoid(12)}`;
  const tenantType = applicant.applicationType === "free_bed" ? "sponsored" : "paid";

  await db.insert(tenants).values({
    id: tenantId,
    applicantId,
    bedId,
    sessionStart: now,
    sessionEnd,
    tenantType,
    status: "active",
    createdAt: now,
  });

  await db
    .update(beds)
    .set({ status: "occupied", currentTenantId: tenantId })
    .where(eq(beds.id, bedId));

  await db
    .update(applicants)
    .set({ status: "allocated" })
    .where(eq(applicants.id, applicantId));

  await db.insert(allocationAuditLog).values({
    id: `alog_${nanoid(12)}`,
    applicantId,
    bedId,
    action: "allocated",
    performedBy,
    notes,
    createdAt: now,
  });

  if (tenantType === "paid") {
    await generateInvoicesForTenant(tenantId);
  }

  await db.insert(auditLog).values({
    id: `audit_${nanoid(12)}`,
    action: "tenant_allocated",
    targetEntity: "tenants",
    targetId: tenantId,
    metadata: JSON.stringify({ applicantId, bedId }),
    createdAt: now,
  });

  return tenantId;
}

export async function runAllocationCycle(applicantIds?: string[]) {
  const pending = await db
    .select()
    .from(applicants)
    .where(
      and(
        eq(applicants.applicationType, "free_bed"),
        inArray(
          applicants.status,
          applicantIds?.length
            ? ["under_review", "submitted"]
            : ["under_review", "submitted"],
        ),
      ),
    );

  const toProcess = applicantIds?.length
    ? pending.filter((a) => applicantIds.includes(a.id))
    : pending;

  toProcess.sort((a, b) => (b.needScore ?? 0) - (a.needScore ?? 0));

  const availableBeds = await db
    .select({ id: beds.id })
    .from(beds)
    .where(
      and(
        eq(beds.fundingType, "sponsored_target"),
        or(eq(beds.status, "sponsored"), eq(beds.status, "available")),
        isNull(beds.currentTenantId),
      ),
    );

  const results: { applicantId: string; bedId?: string; error?: string }[] = [];
  let bedIndex = 0;

  for (const applicant of toProcess) {
    if (bedIndex >= availableBeds.length) {
      results.push({ applicantId: applicant.id, error: "No beds available" });
      continue;
    }
    const bedId = availableBeds[bedIndex].id;
    try {
      await allocateApplicant(
        applicant.id,
        bedId,
        "Automated allocation cycle",
        "system",
      );
      results.push({ applicantId: applicant.id, bedId });
      bedIndex++;
    } catch (err) {
      results.push({
        applicantId: applicant.id,
        error: err instanceof Error ? err.message : "Allocation failed",
      });
    }
  }

  return results;
}

export async function updateBedStatus(
  bedId: string,
  status: "available" | "sponsored" | "occupied" | "maintenance",
) {
  await db.update(beds).set({ status }).where(eq(beds.id, bedId));
}

export async function checkoutTenant(tenantId: string, notes: string) {
  const [tenant] = await db.select().from(tenants).where(eq(tenants.id, tenantId)).limit(1);
  if (!tenant) throw new Error("Tenant not found");

  const now = new Date();

  await db
    .update(tenants)
    .set({ status: "checked_out" })
    .where(eq(tenants.id, tenantId));

  await db
    .update(beds)
    .set({
      status: tenant.tenantType === "sponsored" ? "sponsored" : "available",
      currentTenantId: null,
    })
    .where(eq(beds.id, tenant.bedId));

  await db.insert(auditLog).values({
    id: `audit_${nanoid(12)}`,
    action: "tenant_checkout",
    targetEntity: "tenants",
    targetId: tenantId,
    metadata: JSON.stringify({ notes }),
    createdAt: now,
  });
}

export async function allocateBedToApplicantManual(
  applicantId: string,
  bedId: string,
  performedBy: string,
  notes: string,
) {
  const [applicant] = await db
    .select()
    .from(applicants)
    .where(eq(applicants.id, applicantId))
    .limit(1);

  if (!applicant) throw new Error("Applicant not found");
  if (applicant.status === "allocated") throw new Error("Applicant already allocated");

  const [bed] = await db.select().from(beds).where(eq(beds.id, bedId)).limit(1);
  if (!bed) throw new Error("Bed not found");
  if (bed.currentTenantId) throw new Error("Bed is already occupied");

  // Perform the allocation (reuse existing logic)
  return await allocateApplicant(applicantId, bedId, notes, performedBy);
}

export async function rejectApplicant(applicantId: string, reason: string, performedBy = "admin") {
  const [applicant] = await db
    .select()
    .from(applicants)
    .where(eq(applicants.id, applicantId))
    .limit(1);

  if (!applicant) throw new Error("Applicant not found");

  const now = new Date();

  await db.update(applicants).set({ status: "rejected" }).where(eq(applicants.id, applicantId));

  await db.insert(allocationAuditLog).values({
    id: `alog_${nanoid(12)}`,
    applicantId,
    action: "rejected",
    performedBy,
    notes: reason,
    createdAt: now,
  });

  await db.insert(auditLog).values({
    id: `audit_${nanoid(12)}`,
    action: "applicant_rejected",
    targetEntity: "applicants",
    targetId: applicantId,
    metadata: JSON.stringify({ reason }),
    createdAt: now,
  });
}
