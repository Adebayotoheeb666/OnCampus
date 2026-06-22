import { eq, desc, and, sql } from "drizzle-orm";
import { db } from "@/db";
import {
  maintenanceRequests,
  laundromatMachines,
  laundromatBookings,
  announcements,
  visitorLogs,
} from "@/db/schema";

export async function getMaintenanceRequestsForTenant(tenantId: string) {
  return db
    .select()
    .from(maintenanceRequests)
    .where(eq(maintenanceRequests.tenantId, tenantId))
    .orderBy(desc(maintenanceRequests.createdAt));
}

export async function getOpenMaintenanceCount(tenantId: string) {
  const rows = await db
    .select({ id: maintenanceRequests.id })
    .from(maintenanceRequests)
    .where(
      and(
        eq(maintenanceRequests.tenantId, tenantId),
        sql`${maintenanceRequests.status} != 'resolved'`,
      ),
    );
  return rows.length;
}

export async function getAllMaintenanceRequests() {
  return db
    .select()
    .from(maintenanceRequests)
    .orderBy(desc(maintenanceRequests.createdAt));
}

export async function getLaundromatMachines() {
  return db.select().from(laundromatMachines).orderBy(laundromatMachines.machineLabel);
}

export async function getBookingsForTenant(tenantId: string) {
  return db
    .select({
      booking: laundromatBookings,
      machineLabel: laundromatMachines.machineLabel,
    })
    .from(laundromatBookings)
    .innerJoin(laundromatMachines, eq(laundromatBookings.machineId, laundromatMachines.id))
    .where(eq(laundromatBookings.tenantId, tenantId))
    .orderBy(desc(laundromatBookings.slotStart));
}

export async function getMachineBookingsInRange(machineId: string, start: Date, end: Date) {
  return db
    .select()
    .from(laundromatBookings)
    .where(
      and(
        eq(laundromatBookings.machineId, machineId),
        sql`${laundromatBookings.status} = 'booked'`,
        sql`${laundromatBookings.slotStart} < ${end.getTime()}`,
        sql`${laundromatBookings.slotEnd} > ${start.getTime()}`,
      ),
    );
}

export async function getRecentAnnouncements(limit = 3) {
  return db
    .select()
    .from(announcements)
    .orderBy(desc(announcements.publishedAt))
    .limit(limit);
}

export async function getVisitorsForTenant(tenantId: string) {
  return db
    .select()
    .from(visitorLogs)
    .where(eq(visitorLogs.tenantId, tenantId))
    .orderBy(desc(visitorLogs.expectedArrival));
}

export async function getExpectedVisitors() {
  return db
    .select()
    .from(visitorLogs)
    .where(eq(visitorLogs.status, "expected"))
    .orderBy(visitorLogs.expectedArrival);
}
