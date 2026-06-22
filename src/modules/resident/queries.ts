import { eq, desc, and, sql } from "drizzle-orm";
import { db } from "@/db";
import {
  maintenanceRequests,
  laundromatMachines,
  laundromatBookings,
  announcements,
  visitorLogs,
  tenants,
  applicants,
  beds,
  rooms,
  blocks,
  wallets,
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

export async function getTenantProfile(tenantId: string) {
  const rows = await db
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
    .where(eq(tenants.id, tenantId));

  return rows[0] ?? null;
}

export async function getResidentDashboardData(tenantId: string) {
  const [profile] = await db
    .select({
      tenant: tenants,
      applicant: applicants,
      bedLabel: beds.bedLabel,
    })
    .from(tenants)
    .innerJoin(applicants, eq(tenants.applicantId, applicants.id))
    .innerJoin(beds, eq(tenants.bedId, beds.id))
    .where(eq(tenants.id, tenantId));

  if (!profile) return null;

  // Get pending maintenance
  const maintenance = await db
    .select()
    .from(maintenanceRequests)
    .where(
      and(
        eq(maintenanceRequests.tenantId, tenantId),
        sql`${maintenanceRequests.status} != 'resolved'`,
      ),
    );

  // Get upcoming bookings
  const bookings = await db
    .select()
    .from(laundromatBookings)
    .where(
      and(
        eq(laundromatBookings.tenantId, tenantId),
        eq(laundromatBookings.status, "booked"),
      ),
    )
    .orderBy(laundromatBookings.slotStart)
    .limit(3);

  // Get wallet
  const tenantWallets = await db.select().from(wallets).where(eq(wallets.tenantId, tenantId));

  return {
    profile,
    maintenanceCount: maintenance.length,
    upcomingBookings: bookings.length,
    walletBalance: tenantWallets[0]?.balance ?? 0,
    sessionEnd: profile.tenant.sessionEnd,
  };
}
