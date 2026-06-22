"use server";

import { nanoid } from "nanoid";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db";
import { accessLogs, incidents, visitorLogs } from "@/db/schema";

const accessSchema = z.object({
  tenantId: z.string().optional(),
  visitorLogId: z.string().optional(),
  direction: z.enum(["in", "out"]),
  gateId: z.string().default("main_gate"),
  recordedBy: z.string().default("security"),
});

const incidentSchema = z.object({
  reportedBy: z.string(),
  category: z.enum(["theft", "altercation", "safety_hazard", "other"]),
  description: z.string().min(10),
  severity: z.enum(["low", "medium", "high", "critical"]).default("low"),
});

export async function logAccess(input: unknown) {
  const parsed = accessSchema.safeParse(input);
  if (!parsed.success) return { success: false as const, error: "Invalid access log" };

  const data = parsed.data;
  if (!data.tenantId && !data.visitorLogId) {
    return { success: false as const, error: "Tenant or visitor required" };
  }

  const now = new Date();
  await db.insert(accessLogs).values({
    id: `access_${nanoid(12)}`,
    tenantId: data.tenantId ?? null,
    visitorLogId: data.visitorLogId ?? null,
    direction: data.direction,
    gateId: data.gateId,
    recordedBy: data.recordedBy,
    timestamp: now,
  });

  if (data.visitorLogId && data.direction === "in") {
    await db
      .update(visitorLogs)
      .set({ status: "checked_in", checkedInAt: now })
      .where(eq(visitorLogs.id, data.visitorLogId));
  }

  return { success: true as const };
}

export async function reportIncident(input: unknown) {
  const parsed = incidentSchema.safeParse(input);
  if (!parsed.success) return { success: false as const, error: "Invalid incident report" };

  const data = parsed.data;
  await db.insert(incidents).values({
    id: `inc_${nanoid(12)}`,
    reportedBy: data.reportedBy,
    category: data.category,
    description: data.description,
    severity: data.severity,
    status: "open",
    createdAt: new Date(),
  });

  return { success: true as const };
}

export async function updateIncidentStatus(
  incidentId: string,
  status: "investigating" | "resolved",
) {
  await db
    .update(incidents)
    .set({
      status,
      resolvedAt: status === "resolved" ? new Date() : undefined,
    })
    .where(eq(incidents.id, incidentId));
}

export async function approveVisitorEntry(visitorLogId: string) {
  return logAccess({
    visitorLogId,
    direction: "in",
    gateId: "main_gate",
    recordedBy: "security",
  });
}
