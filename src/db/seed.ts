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
  applicants,
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

  // Seed applicants
  const applicantData = [
    {
      fullName: "Chioma Okafor",
      matricOrJambNo: "FT/2023/001",
      level: "100",
      gender: "female",
      phone: "+2348012345678",
      email: "chioma@example.com",
      stateOfOrigin: "Lagos",
      needScore: 85,
      applicationType: "free_bed" as const,
      status: "submitted" as const,
    },
    {
      fullName: "Adebayo Adeleke",
      matricOrJambNo: "FT/2023/002",
      level: "100",
      gender: "male",
      phone: "+2348012345679",
      email: "adebayo@example.com",
      stateOfOrigin: "Oyo",
      needScore: 72,
      applicationType: "free_bed" as const,
      status: "submitted" as const,
    },
    {
      fullName: "Fatima Hassan",
      matricOrJambNo: "FT/2023/003",
      level: "200",
      gender: "female",
      phone: "+2348012345680",
      email: "fatima@example.com",
      stateOfOrigin: "Kano",
      needScore: 78,
      applicationType: "paid_bed" as const,
      status: "submitted" as const,
    },
    {
      fullName: "Emeka Nwankwo",
      matricOrJambNo: "FT/2023/004",
      level: "100",
      gender: "male",
      phone: "+2348012345681",
      email: "emeka@example.com",
      stateOfOrigin: "Enugu",
      needScore: 91,
      applicationType: "free_bed" as const,
      status: "submitted" as const,
    },
  ];

  for (const data of applicantData) {
    const incomeBrackets = ["below_50k", "50k_100k", "100k_200k", "above_200k"] as const;
    const distanceCategories = ["onsite", "nearby", "far"] as const;
    const guardianStatuses = ["orphan", "single_parent", "both_parents"] as const;
    
    await db.insert(applicants).values({
      id: `app_${nanoid(8)}`,
      fullName: data.fullName,
      matricOrJambNo: data.matricOrJambNo,
      level: data.level,
      gender: data.gender,
      phone: data.phone,
      email: data.email,
      stateOfOrigin: data.stateOfOrigin,
      needScore: data.needScore,
      needAssessmentJson: JSON.stringify({
        incomeBracket: incomeBrackets[Math.floor(Math.random() * incomeBrackets.length)],
        distanceCategory: distanceCategories[Math.floor(Math.random() * distanceCategories.length)],
        guardianStatus: guardianStatuses[Math.floor(Math.random() * guardianStatuses.length)],
      }),
      applicationType: data.applicationType,
      status: data.status,
      createdAt: now,
    });
  }

  console.log(
    "Seed complete: 2 blocks, 14 beds, 4 laundromat machines, 1 announcement, 1 asset, 4 applicants",
  );
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
