import { nanoid } from "nanoid";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import {
  sponsorshipPledges,
  sponsors,
  sponsorCertificates,
  beds,
  blocks,
  rooms,
} from "@/db/schema";
import { buildCertificatePdf } from "@/lib/certificates/pdf";
import { sendCertificateEmail } from "@/lib/notifications/email";
import type { SponsorshipTier } from "@/lib/constants";

export async function generateSponsorCertificateJob(pledgeId: string) {
  const [existing] = await db
    .select()
    .from(sponsorCertificates)
    .where(eq(sponsorCertificates.pledgeId, pledgeId))
    .limit(1);

  if (existing) return existing;

  const [row] = await db
    .select({
      pledge: sponsorshipPledges,
      sponsor: sponsors,
      bedLabel: beds.bedLabel,
      blockName: blocks.name,
    })
    .from(sponsorshipPledges)
    .innerJoin(sponsors, eq(sponsorshipPledges.sponsorId, sponsors.id))
    .leftJoin(beds, eq(sponsorshipPledges.bedId, beds.id))
    .leftJoin(rooms, eq(beds.roomId, rooms.id))
    .leftJoin(blocks, eq(rooms.blockId, blocks.id))
    .where(eq(sponsorshipPledges.id, pledgeId))
    .limit(1);

  if (!row || row.pledge.status !== "fulfilled") {
    throw new Error("Pledge not fulfilled — certificate not issued");
  }

  const issuedAt = new Date();
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const fileUrl = `${baseUrl}/api/certificates/${pledgeId}`;

  await buildCertificatePdf({
    sponsorName: row.sponsor.fullName,
    pledgeId,
    tier: row.pledge.tier as SponsorshipTier,
    amountKobo: row.pledge.amountPledged,
    bedLabel: row.bedLabel ?? undefined,
    blockName: row.blockName ?? undefined,
    issuedAt,
  });

  const [cert] = await db
    .insert(sponsorCertificates)
    .values({
      id: `cert_${nanoid(12)}`,
      pledgeId,
      fileUrl,
      issuedAt,
    })
    .returning();

  await sendCertificateEmail(row.sponsor.email, row.sponsor.fullName, fileUrl);

  return cert;
}

export async function getCertificatePdfBytes(pledgeId: string) {
  const [row] = await db
    .select({
      pledge: sponsorshipPledges,
      sponsor: sponsors,
      bedLabel: beds.bedLabel,
      blockName: blocks.name,
    })
    .from(sponsorshipPledges)
    .innerJoin(sponsors, eq(sponsorshipPledges.sponsorId, sponsors.id))
    .leftJoin(beds, eq(sponsorshipPledges.bedId, beds.id))
    .leftJoin(rooms, eq(beds.roomId, rooms.id))
    .leftJoin(blocks, eq(rooms.blockId, blocks.id))
    .where(eq(sponsorshipPledges.id, pledgeId))
    .limit(1);

  if (!row) return null;

  return buildCertificatePdf({
    sponsorName: row.sponsor.fullName,
    pledgeId,
    tier: row.pledge.tier as SponsorshipTier,
    amountKobo: row.pledge.amountPaid ?? row.pledge.amountPledged,
    bedLabel: row.bedLabel ?? undefined,
    blockName: row.blockName ?? undefined,
    issuedAt: new Date(),
  });
}
