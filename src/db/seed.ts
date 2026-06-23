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
  sponsors,
  sponsorshipPledges,
  sponsorPayments,
  opexEntries,
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

  // Seed sponsors with pledges and payments
  const sponsorData = [
    { fullName: "Global Tech Fund", type: "organization" as const, email: "contact@globaltechfund.com", status: "active" as const },
    { fullName: "Sarah Jenkins", type: "individual" as const, email: "sarah@example.com", status: "active" as const },
    { fullName: "Heritage Foundation", type: "organization" as const, email: "info@heritagefoundation.org", status: "committed" as const },
    { fullName: "Zion Estates Ltd", type: "organization" as const, email: "partnerships@zionestatees.com", status: "active" as const },
    { fullName: "Dr. Adams", type: "individual" as const, email: "dr.adams@example.com", status: "lapsed" as const },
    { fullName: "TechVentures Inc", type: "organization" as const, email: "csr@techventures.ng", status: "active" as const },
    { fullName: "Alumni Group A", type: "organization" as const, email: "alumni@futa.edu.ng", status: "prospect" as const },
    { fullName: "John Okoro", type: "individual" as const, email: "john@example.com", status: "active" as const },
    { fullName: "Corporate Giving Ltd", type: "organization" as const, email: "giving@corporate.ng", status: "active" as const },
  ];

  const sponsorIds: string[] = [];
  for (const data of sponsorData) {
    const sponsorId = `sponsor_${nanoid(8)}`;
    sponsorIds.push(sponsorId);
    await db.insert(sponsors).values({
      id: sponsorId,
      type: data.type,
      fullName: data.fullName,
      organizationName: data.type === "organization" ? data.fullName : undefined,
      email: data.email,
      phone: "+234" + Math.floor(Math.random() * 9000000000 + 1000000000),
      isDiaspora: Math.random() > 0.7,
      status: data.status,
      createdAt: now,
      updatedAt: now,
    });
  }

  // Create pledges and payments for sponsors
  const bedIds = (await db.select({ id: beds.id }).from(beds)).map(b => b.id);

  for (let i = 0; i < Math.min(sponsorIds.length, 6); i++) {
    const sponsorId = sponsorIds[i];
    const bedId = bedIds[i % bedIds.length];
    const pledgeAmount = SPONSORSHIP_TIERS.full_bed.amountKobo;

    const pledgeId = `pledge_${nanoid(8)}`;
    await db.insert(sponsorshipPledges).values({
      id: pledgeId,
      sponsorId,
      bedId,
      tier: "full_bed",
      amountPledged: pledgeAmount,
      amountPaid: pledgeAmount,
      recurring: false,
      status: "fulfilled",
      createdAt: now,
    });

    // Create payment record
    await db.insert(sponsorPayments).values({
      id: `payment_${nanoid(8)}`,
      pledgeId,
      amount: pledgeAmount,
      provider: "paystack",
      providerReference: `TXN_${nanoid(12)}`,
      status: "success",
      paidAt: new Date(now.getTime() - Math.random() * 30 * 24 * 60 * 60 * 1000),
    });
  }

  // Create partial pledges
  for (let i = 3; i < 5 && i < sponsorIds.length; i++) {
    const sponsorId = sponsorIds[i];
    const bedId = bedIds[5 + i];
    const pledgeAmount = SPONSORSHIP_TIERS.partial.amountKobo;

    const pledgeId = `pledge_${nanoid(8)}`;
    await db.insert(sponsorshipPledges).values({
      id: pledgeId,
      sponsorId,
      bedId,
      tier: "partial",
      amountPledged: pledgeAmount,
      amountPaid: pledgeAmount,
      recurring: false,
      status: "fulfilled",
      createdAt: now,
    });

    await db.insert(sponsorPayments).values({
      id: `payment_${nanoid(8)}`,
      pledgeId,
      amount: pledgeAmount,
      provider: "paystack",
      providerReference: `TXN_${nanoid(12)}`,
      status: "success",
      paidAt: new Date(now.getTime() - Math.random() * 60 * 24 * 60 * 60 * 1000),
    });
  }

  // Seed OPEX entries
  const opexCategories = ["utilities", "staff", "security", "misc"] as const;
  const opexDescriptions = {
    utilities: ["Water bill", "Electricity bill", "Internet fees"],
    staff: ["Cleaning staff salaries", "Security staff", "Maintenance crew"],
    security: ["CCTV maintenance", "Gate repairs", "Security equipment"],
    misc: ["Office supplies", "Miscellaneous repairs", "Emergency repairs"],
  };

  for (const category of opexCategories) {
    for (let i = 0; i < 3; i++) {
      const descriptions = opexDescriptions[category];
      const daysAgo = Math.floor(Math.random() * 90);
      const incurredDate = new Date(now);
      incurredDate.setDate(incurredDate.getDate() - daysAgo);

      await db.insert(opexEntries).values({
        id: `opex_${nanoid(8)}`,
        category,
        amount: Math.floor(Math.random() * 1000000) + 100000, // 1k - 11k
        description: descriptions[Math.floor(Math.random() * descriptions.length)],
        incurredAt: incurredDate,
        enteredBy: "admin@oncampus.ng",
      });
    }
  }

  // Add more assets
  const assetCategories = [
    { name: "Borehole Pump", category: "water" as const },
    { name: "Laundromat System", category: "facilities" as const },
    { name: "Main HVAC System", category: "climate" as const },
  ];

  for (const asset of assetCategories) {
    const assetId = `asset_${nanoid(8)}`;
    await db.insert(assets).values({
      id: assetId,
      name: asset.name,
      category: asset.category,
      installDate: new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000),
      serviceIntervalDays: 90,
    });

    const scheduleDate = new Date(now);
    scheduleDate.setDate(scheduleDate.getDate() + Math.floor(Math.random() * 90));
    await db.insert(maintenanceSchedules).values({
      id: `msched_${nanoid(8)}`,
      assetId,
      scheduledDate: scheduleDate,
      status: Math.random() > 0.5 ? "scheduled" : "completed",
    });
  }

  console.log(
    "Seed complete: 2 blocks, 14+ beds, 9 sponsors, 8 pledges, 4 laundromat machines, 12 OPEX entries, 4 assets, 4 applicants",
  );
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
