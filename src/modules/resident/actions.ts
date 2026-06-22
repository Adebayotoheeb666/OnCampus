"use server";

import { nanoid } from "nanoid";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db";
import { maintenanceRequests, laundromatBookings, visitorLogs } from "@/db/schema";
import { getMachineBookingsInRange } from "@/modules/resident/queries";
import { uploadImage } from "@/lib/media/cloudinary";

const maintenanceSchema = z.object({
  tenantId: z.string(),
  category: z.enum(["plumbing", "electrical", "structural", "other"]),
  description: z.string().min(10),
  priority: z.enum(["low", "normal", "high", "urgent"]).default("normal"),
  photoBase64: z.string().optional(),
});

const bookingSchema = z.object({
  tenantId: z.string(),
  machineId: z.string(),
  slotStart: z.string(),
});

const visitorSchema = z.object({
  tenantId: z.string(),
  visitorName: z.string().min(2),
  visitorPhone: z.string().optional(),
  expectedArrival: z.string(),
});

export async function submitMaintenanceRequest(input: unknown) {
  const parsed = maintenanceSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false as const, error: parsed.error.errors[0]?.message ?? "Invalid input" };
  }

  const data = parsed.data;

  let photoUrl: string | null = null;
  if (data.photoBase64) {
    photoUrl = await uploadImage(data.photoBase64, "oncampus/maintenance");
  }

  await db.insert(maintenanceRequests).values({
    id: `mreq_${nanoid(12)}`,
    tenantId: data.tenantId,
    category: data.category,
    description: data.description,
    photoUrl,
    priority: data.priority,
    status: "open",
    createdAt: new Date(),
  });

  return { success: true as const };
}

export async function bookLaundromatSlot(input: unknown) {
  const parsed = bookingSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false as const, error: "Invalid booking details" };
  }

  const data = parsed.data;
  const slotStart = new Date(data.slotStart);
  const slotEnd = new Date(slotStart);
  slotEnd.setHours(slotEnd.getHours() + 1);

  const overlaps = await getMachineBookingsInRange(data.machineId, slotStart, slotEnd);
  if (overlaps.length > 0) {
    return { success: false as const, error: "This slot is already booked. Please choose another time." };
  }

  await db.insert(laundromatBookings).values({
    id: `lbook_${nanoid(12)}`,
    machineId: data.machineId,
    tenantId: data.tenantId,
    slotStart,
    slotEnd,
    status: "booked",
  });

  return { success: true as const };
}

export async function registerVisitor(input: unknown) {
  const parsed = visitorSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false as const, error: "Invalid visitor details" };
  }

  const data = parsed.data;
  await db.insert(visitorLogs).values({
    id: `vis_${nanoid(12)}`,
    tenantId: data.tenantId,
    visitorName: data.visitorName,
    visitorPhone: data.visitorPhone ?? null,
    expectedArrival: new Date(data.expectedArrival),
    status: "expected",
  });

  return { success: true as const };
}

export async function updateMaintenanceStatus(
  requestId: string,
  status: "assigned" | "in_progress" | "resolved",
  assignedTo?: string,
) {
  const now = new Date();
  await db
    .update(maintenanceRequests)
    .set({
      status,
      assignedTo: assignedTo ?? undefined,
      resolvedAt: status === "resolved" ? now : undefined,
    })
    .where(eq(maintenanceRequests.id, requestId));
}
