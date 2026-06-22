import { nanoid } from "nanoid";
import { db } from "@/db";
import {
  blocks,
  rooms,
  beds,
  impactStories,
  laundromatMachines,
  announcements,
  assets,
  maintenanceSchedules,
} from "@/db/schema";
import { SPONSORSHIP_TIERS } from "@/lib/constants";

async function seed() {
  const now = new Date();

  // Block A — sponsored beds
  const blockAId = `block_${nanoid(8)}`;
  await db.insert(blocks).values({
    id: blockAId,
    name: "Block A (Pilot)",
    gender: "mixed",
    totalRooms: 5,
  });

  const roomAIds: string[] = [];
  for (let r = 1; r <= 5; r++) {
    const roomId = `room_${nanoid(8)}`;
    roomAIds.push(roomId);
    await db.insert(rooms).values({
      id: roomId,
      blockId: blockAId,
      roomNumber: `${r}0${r}`,
      capacity: 2,
    });
  }

  let bedIndex = 0;
  for (const roomId of roomAIds) {
    for (const label of ["A", "B"]) {
      bedIndex++;
      const partiallyFunded = bedIndex <= 2;
      const fullySponsored = bedIndex >= 3 && bedIndex <= 6;
      await db.insert(beds).values({
        id: `bed_${nanoid(8)}`,
        roomId,
        bedLabel: label,
        fundingType: "sponsored_target",
        status: fullySponsored ? "sponsored" : "available",
        targetAmountKobo: SPONSORSHIP_TIERS.full_bed.amountKobo,
        fundedAmountKobo: fullySponsored
          ? SPONSORSHIP_TIERS.full_bed.amountKobo
          : partiallyFunded
            ? SPONSORSHIP_TIERS.partial.amountKobo
            : 0,
      });
    }
  }

  // Block B — paid beds
  const blockBId = `block_${nanoid(8)}`;
  await db.insert(blocks).values({
    id: blockBId,
    name: "Block B (Paid)",
    gender: "male",
    totalRooms: 2,
  });

  for (let r = 1; r <= 2; r++) {
    const roomId = `room_${nanoid(8)}`;
    await db.insert(rooms).values({
      id: roomId,
      blockId: blockBId,
      roomNumber: `B${r}0${r}`,
      capacity: 2,
    });
    for (const label of ["A", "B"]) {
      await db.insert(beds).values({
        id: `bed_${nanoid(8)}`,
        roomId,
        bedLabel: label,
        fundingType: "paid",
        status: "available",
        targetAmountKobo: 0,
        fundedAmountKobo: 0,
      });
    }
  }

  await db.insert(impactStories).values({
    id: `story_${nanoid(8)}`,
    title: "A safe start at FUTA",
    excerpt:
      "Thanks to my sponsor, I could focus on my first semester without worrying about where I would sleep.",
    consentGranted: true,
    publishedAt: now,
    sponsorAttribution: "Anonymous sponsor",
  });

  for (let i = 1; i <= 4; i++) {
    await db.insert(laundromatMachines).values({
      id: `lmach_${nanoid(8)}`,
      machineLabel: `Washer ${i}`,
      status: "available",
    });
  }

  await db.insert(announcements).values({
    id: `ann_${nanoid(8)}`,
    title: "Welcome to the OnCampus pilot",
    body: "Please familiarise yourself with the resident portal for maintenance, laundry booking, and visitor pre-registration.",
    audience: "all",
    publishedAt: now,
  });

  const generatorId = `asset_${nanoid(8)}`;
  await db.insert(assets).values({
    id: generatorId,
    name: "Generator 1",
    category: "power",
    installDate: now,
    serviceIntervalDays: 90,
  });

  const nextService = new Date(now);
  nextService.setDate(nextService.getDate() + 30);
  await db.insert(maintenanceSchedules).values({
    id: `msched_${nanoid(8)}`,
    assetId: generatorId,
    scheduledDate: nextService,
    status: "scheduled",
  });

  console.log(
    "Seed complete: 2 blocks, 14 beds, 4 laundromat machines, 1 announcement, 1 asset",
  );
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
