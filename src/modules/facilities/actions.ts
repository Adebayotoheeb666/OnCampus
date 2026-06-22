"use server";

import { nanoid } from "nanoid";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db";
import { assets, maintenanceSchedules } from "@/db/schema";

const assetSchema = z.object({
  name: z.string().min(2),
  category: z.string().min(2),
  serviceIntervalDays: z.number().int().positive().optional(),
});

export async function createAsset(input: unknown) {
  const parsed = assetSchema.safeParse(input);
  if (!parsed.success) return { success: false as const, error: "Invalid asset" };

  const data = parsed.data;
  const id = `asset_${nanoid(12)}`;
  await db.insert(assets).values({
    id,
    name: data.name,
    category: data.category,
    installDate: new Date(),
    serviceIntervalDays: data.serviceIntervalDays ?? null,
  });

  return { success: true as const, id };
}

export async function completeScheduledMaintenance(
  scheduleId: string,
  cost: number,
  vendor: string,
) {
  const [schedule] = await db
    .select()
    .from(maintenanceSchedules)
    .where(eq(maintenanceSchedules.id, scheduleId))
    .limit(1);
  if (!schedule) return;

  const now = new Date();
  await db
    .update(maintenanceSchedules)
    .set({ status: "completed", cost, vendor })
    .where(eq(maintenanceSchedules.id, scheduleId));

  await db
    .update(assets)
    .set({ lastServiced: now })
    .where(eq(assets.id, schedule.assetId));
}
