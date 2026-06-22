import { eq, desc, and, asc, lte, isNull, or, sql } from "drizzle-orm";
import { db } from "@/db";
import {
  applicants,
  tenants,
  allocationAuditLog,
  beds,
  blocks,
  rooms,
} from "@/db/schema";

export async function getApplicants(filters?: {
  status?: string;
  applicationType?: string;
}) {
  const conditions = [];
  if (filters?.status) {
    conditions.push(eq(applicants.status, filters.status as "submitted"));
  }
  if (filters?.applicationType) {
    conditions.push(
      eq(applicants.applicationType, filters.applicationType as "free_bed"),
    );
  }

  return db
    .select()
    .from(applicants)
    .where(conditions.length ? and(...conditions) : undefined)
    .orderBy(desc(applicants.needScore), desc(applicants.createdAt));
}

export async function getApplicantById(id: string) {
  const [row] = await db.select().from(applicants).where(eq(applicants.id, id)).limit(1);
  return row ?? null;
}

export async function getApplicantDetails(id: string) {
  const [applicant] = await db
    .select({
      applicant: applicants,
      auditTrail: sql<string>`group_concat(json_object('action', ${allocationAuditLog.action}, 'notes', ${allocationAuditLog.notes}, 'createdAt', ${allocationAuditLog.createdAt}, 'performedBy', ${allocationAuditLog.performedBy}))`,
    })
    .from(applicants)
    .leftJoin(allocationAuditLog, eq(applicants.id, allocationAuditLog.applicantId))
    .where(eq(applicants.id, id))
    .groupBy(applicants.id)
    .limit(1);

  if (!applicant) return null;

  return {
    ...applicant,
    needAssessment: applicant.applicant.needAssessmentJson
      ? JSON.parse(applicant.applicant.needAssessmentJson)
      : null,
  };
}

export async function lookupApplicant(params: {
  reference?: string;
  email?: string;
  matricOrJambNo?: string;
}) {
  if (params.reference) {
    return getApplicantById(params.reference);
  }
  if (params.email && params.matricOrJambNo) {
    const [row] = await db
      .select()
      .from(applicants)
      .where(
        and(
          eq(applicants.email, params.email),
          eq(applicants.matricOrJambNo, params.matricOrJambNo),
        ),
      )
      .orderBy(desc(applicants.createdAt))
      .limit(1);
    return row ?? null;
  }
  return null;
}

export async function getApplicantAuditTrail(applicantId: string) {
  return db
    .select()
    .from(allocationAuditLog)
    .where(eq(allocationAuditLog.applicantId, applicantId))
    .orderBy(asc(allocationAuditLog.createdAt));
}

export async function getAllocationAuditLog(limit = 100) {
  return db
    .select({
      log: allocationAuditLog,
      applicantName: applicants.fullName,
      bedLabel: beds.bedLabel,
      blockName: blocks.name,
      roomNumber: rooms.roomNumber,
    })
    .from(allocationAuditLog)
    .innerJoin(applicants, eq(allocationAuditLog.applicantId, applicants.id))
    .leftJoin(beds, eq(allocationAuditLog.bedId, beds.id))
    .leftJoin(rooms, eq(beds.roomId, rooms.id))
    .leftJoin(blocks, eq(rooms.blockId, blocks.id))
    .orderBy(desc(allocationAuditLog.createdAt))
    .limit(limit);
}

export type BedInventoryItem = {
  id: string;
  bedLabel: string;
  status: string | null;
  fundingType: string;
  currentTenantId: string | null;
  roomNumber: string;
  blockName: string;
  blockGender: string;
  tenantName: string | null;
};

export async function getBedInventory(filters?: {
  blockId?: string;
  gender?: string;
  status?: string;
}) {
  const rows = await db
    .select({
      id: beds.id,
      bedLabel: beds.bedLabel,
      status: beds.status,
      fundingType: beds.fundingType,
      currentTenantId: beds.currentTenantId,
      roomNumber: rooms.roomNumber,
      blockName: blocks.name,
      blockGender: blocks.gender,
      blockId: blocks.id,
      tenantName: applicants.fullName,
    })
    .from(beds)
    .innerJoin(rooms, eq(beds.roomId, rooms.id))
    .innerJoin(blocks, eq(rooms.blockId, blocks.id))
    .leftJoin(tenants, eq(beds.currentTenantId, tenants.id))
    .leftJoin(applicants, eq(tenants.applicantId, applicants.id))
    .orderBy(blocks.name, rooms.roomNumber, beds.bedLabel);

  return rows.filter((row) => {
    if (filters?.blockId && row.blockId !== filters.blockId) return false;
    if (filters?.gender && row.blockGender !== filters.gender) return false;
    if (filters?.status && row.status !== filters.status) return false;
    return true;
  }) satisfies BedInventoryItem[];
}

export async function getTenantsNearingCheckout(withinDays = 30) {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() + withinDays);

  return db
    .select({
      tenant: tenants,
      applicantName: applicants.fullName,
      applicantEmail: applicants.email,
      bedLabel: beds.bedLabel,
      blockName: blocks.name,
      roomNumber: rooms.roomNumber,
    })
    .from(tenants)
    .innerJoin(applicants, eq(tenants.applicantId, applicants.id))
    .innerJoin(beds, eq(tenants.bedId, beds.id))
    .innerJoin(rooms, eq(beds.roomId, rooms.id))
    .innerJoin(blocks, eq(rooms.blockId, blocks.id))
    .where(
      and(
        eq(tenants.status, "active"),
        lte(tenants.sessionEnd, cutoff),
      ),
    )
    .orderBy(asc(tenants.sessionEnd));
}

export async function getTenantByApplicantLookup(email: string, matricOrJambNo: string) {
  const [row] = await db
    .select({
      tenant: tenants,
      applicant: applicants,
      bedLabel: beds.bedLabel,
      blockName: blocks.name,
      roomNumber: rooms.roomNumber,
    })
    .from(tenants)
    .innerJoin(applicants, eq(tenants.applicantId, applicants.id))
    .innerJoin(beds, eq(tenants.bedId, beds.id))
    .innerJoin(rooms, eq(beds.roomId, rooms.id))
    .innerJoin(blocks, eq(rooms.blockId, blocks.id))
    .where(
      and(
        eq(applicants.email, email),
        eq(applicants.matricOrJambNo, matricOrJambNo),
        eq(tenants.status, "active"),
      ),
    )
    .limit(1);

  return row ?? null;
}

export async function getAvailableBedsForAllocation(type: "free_bed" | "paid_bed") {
  if (type === "free_bed") {
    return db
      .select({ id: beds.id, bedLabel: beds.bedLabel, blockName: blocks.name })
      .from(beds)
      .innerJoin(rooms, eq(beds.roomId, rooms.id))
      .innerJoin(blocks, eq(rooms.blockId, blocks.id))
      .where(
        and(
          eq(beds.fundingType, "sponsored_target"),
          or(eq(beds.status, "sponsored"), eq(beds.status, "available")),
        isNull(beds.currentTenantId),
        ),
      );
  }

  return db
    .select({ id: beds.id, bedLabel: beds.bedLabel, blockName: blocks.name })
    .from(beds)
    .innerJoin(rooms, eq(beds.roomId, rooms.id))
    .innerJoin(blocks, eq(rooms.blockId, blocks.id))
    .where(
      and(
        eq(beds.fundingType, "paid"),
        eq(beds.status, "available"),
        isNull(beds.currentTenantId),
      ),
    );
}

export async function getApplicantsForReview(status?: string) {
  const conditions = [];
  if (status) {
    conditions.push(eq(applicants.status, status as "submitted"));
  } else {
    conditions.push(eq(applicants.status, "submitted"));
  }

  return db
    .select({
      applicant: applicants,
      auditCount: sql<number>`count(${allocationAuditLog.id})`,
    })
    .from(applicants)
    .leftJoin(allocationAuditLog, eq(applicants.id, allocationAuditLog.applicantId))
    .where(conditions.length ? and(...conditions) : undefined)
    .groupBy(applicants.id)
    .orderBy(desc(applicants.needScore), desc(applicants.createdAt));
}

export async function getAuditLogEntries(filters?: {
  applicantId?: string;
  action?: string;
  limit?: number;
}) {
  const conditions = [];
  if (filters?.applicantId) {
    conditions.push(eq(allocationAuditLog.applicantId, filters.applicantId));
  }
  if (filters?.action) {
    conditions.push(eq(allocationAuditLog.action, filters.action as "scored"));
  }

  const result = db
    .select({
      log: allocationAuditLog,
      applicantName: applicants.fullName,
      bedLabel: beds.bedLabel,
      blockName: blocks.name,
    })
    .from(allocationAuditLog)
    .innerJoin(applicants, eq(allocationAuditLog.applicantId, applicants.id))
    .leftJoin(beds, eq(allocationAuditLog.bedId, beds.id))
    .leftJoin(rooms, eq(beds.roomId, rooms.id))
    .leftJoin(blocks, eq(rooms.blockId, blocks.id))
    .where(conditions.length ? and(...conditions) : undefined)
    .orderBy(desc(allocationAuditLog.createdAt));

  if (filters?.limit) {
    return result.limit(filters.limit);
  }

  return result;
}
