import { eq, sql, and, desc } from "drizzle-orm";
import { db } from "@/db";
import {
  beds,
  blocks,
  rooms,
  sponsors,
  sponsorshipPledges,
  sponsorPayments,
  impactStories,
  sponsorCertificates,
} from "@/db/schema";

export type BedWithLocation = {
  id: string;
  bedLabel: string;
  status: string | null;
  fundingType: string;
  targetAmountKobo: number;
  fundedAmountKobo: number;
  roomNumber: string;
  blockName: string;
  blockGender: string;
};

export async function getCampaignStats() {
  const [bedStats] = await db
    .select({
      totalBeds: sql<number>`count(*)`,
      fundedBeds: sql<number>`sum(case when ${beds.status} in ('sponsored', 'occupied') then 1 else 0 end)`,
      totalRaised: sql<number>`coalesce(sum(${beds.fundedAmountKobo}), 0)`,
      totalTarget: sql<number>`coalesce(sum(${beds.targetAmountKobo}), 0)`,
    })
    .from(beds)
    .where(eq(beds.fundingType, "sponsored_target"));

  const [pledgeStats] = await db
    .select({
      totalPledged: sql<number>`coalesce(sum(${sponsorshipPledges.amountPledged}), 0)`,
      totalPaid: sql<number>`coalesce(sum(${sponsorshipPledges.amountPaid}), 0)`,
    })
    .from(sponsorshipPledges);

  return {
    totalBeds: bedStats?.totalBeds ?? 0,
    fundedBeds: bedStats?.fundedBeds ?? 0,
    totalRaised: pledgeStats?.totalPaid ?? bedStats?.totalRaised ?? 0,
    totalTarget: bedStats?.totalTarget ?? 0,
  };
}

export async function getAvailableBeds(filters?: {
  blockId?: string;
  gender?: string;
  status?: string;
}) {
  const conditions = [eq(beds.fundingType, "sponsored_target")];

  if (filters?.status) {
    conditions.push(eq(beds.status, filters.status as "available"));
  }

  const rows = await db
    .select({
      id: beds.id,
      bedLabel: beds.bedLabel,
      status: beds.status,
      fundingType: beds.fundingType,
      targetAmountKobo: beds.targetAmountKobo,
      fundedAmountKobo: beds.fundedAmountKobo,
      roomNumber: rooms.roomNumber,
      blockName: blocks.name,
      blockGender: blocks.gender,
      blockId: blocks.id,
    })
    .from(beds)
    .innerJoin(rooms, eq(beds.roomId, rooms.id))
    .innerJoin(blocks, eq(rooms.blockId, blocks.id))
    .where(and(...conditions))
    .orderBy(blocks.name, rooms.roomNumber, beds.bedLabel);

  return rows.filter((row) => {
    if (filters?.blockId && row.blockId !== filters.blockId) return false;
    if (filters?.gender && row.blockGender !== filters.gender) return false;
    return true;
  }) satisfies BedWithLocation[];
}

export async function getBedById(bedId: string) {
  const [row] = await db
    .select({
      id: beds.id,
      bedLabel: beds.bedLabel,
      status: beds.status,
      fundingType: beds.fundingType,
      targetAmountKobo: beds.targetAmountKobo,
      fundedAmountKobo: beds.fundedAmountKobo,
      roomNumber: rooms.roomNumber,
      blockName: blocks.name,
      blockGender: blocks.gender,
    })
    .from(beds)
    .innerJoin(rooms, eq(beds.roomId, rooms.id))
    .innerJoin(blocks, eq(rooms.blockId, blocks.id))
    .where(eq(beds.id, bedId))
    .limit(1);

  return row ?? null;
}

export async function getBlocks() {
  return db.select().from(blocks).orderBy(blocks.name);
}

export async function getSponsorPledges(sponsorId: string) {
  return db
    .select({
      pledge: sponsorshipPledges,
      bedLabel: beds.bedLabel,
      blockName: blocks.name,
      roomNumber: rooms.roomNumber,
    })
    .from(sponsorshipPledges)
    .leftJoin(beds, eq(sponsorshipPledges.bedId, beds.id))
    .leftJoin(rooms, eq(beds.roomId, rooms.id))
    .leftJoin(blocks, eq(rooms.blockId, blocks.id))
    .where(eq(sponsorshipPledges.sponsorId, sponsorId))
    .orderBy(desc(sponsorshipPledges.createdAt));
}

export async function getSponsorsForCrm() {
  return db.select().from(sponsors).orderBy(sponsors.updatedAt);
}

export async function getPublishedImpactStories() {
  return db
    .select()
    .from(impactStories)
    .where(eq(impactStories.consentGranted, true))
    .orderBy(desc(impactStories.publishedAt));
}

export async function getPledgeByReference(pledgeId: string) {
  const [pledge] = await db
    .select()
    .from(sponsorshipPledges)
    .where(eq(sponsorshipPledges.id, pledgeId))
    .limit(1);
  return pledge ?? null;
}

export async function getSponsorPaymentsForPledge(pledgeId: string) {
  return db
    .select()
    .from(sponsorPayments)
    .where(eq(sponsorPayments.pledgeId, pledgeId))
    .orderBy(desc(sponsorPayments.paidAt));
}

export async function getSponsorByEmail(email: string) {
  const [row] = await db
    .select()
    .from(sponsors)
    .where(eq(sponsors.email, email.trim().toLowerCase()))
    .limit(1);
  return row ?? null;
}

export async function getCertificatesForSponsor(sponsorId: string) {
  return db
    .select({
      certificate: sponsorCertificates,
      pledge: sponsorshipPledges,
    })
    .from(sponsorCertificates)
    .innerJoin(sponsorshipPledges, eq(sponsorCertificates.pledgeId, sponsorshipPledges.id))
    .where(eq(sponsorshipPledges.sponsorId, sponsorId));
}
