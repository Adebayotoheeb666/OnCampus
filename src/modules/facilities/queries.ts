import { eq } from "drizzle-orm";
import { db } from "@/db";
import { assets, maintenanceSchedules } from "@/db/schema";

export async function getAssets() {
  return db.select().from(assets).orderBy(assets.name);
}

export async function getMaintenanceSchedules() {
  return db
    .select({
      schedule: maintenanceSchedules,
      assetName: assets.name,
    })
    .from(maintenanceSchedules)
    .innerJoin(assets, eq(maintenanceSchedules.assetId, assets.id))
    .orderBy(maintenanceSchedules.scheduledDate);
}

export async function getOverdueSchedules() {
  const now = new Date();
  const rows = await getMaintenanceSchedules();
  return rows.filter(
    (r) => r.schedule.status === "scheduled" && r.schedule.scheduledDate < now,
  );
}
