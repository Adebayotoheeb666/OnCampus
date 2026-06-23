import { getAvailableBeds, getCampaignStats } from "@/modules/sponsor/queries";
import { getBedInventory } from "@/modules/allocation/queries";
import { HomePageClient } from "./home-client";
import { fundingPercent } from "@/lib/utils";

export default async function HomePage() {
  const [stats, beds, allBeds] = await Promise.all([
    getCampaignStats(),
    getAvailableBeds({ status: "available" }),
    getBedInventory(),
  ]);

  // Count actual occupied beds (students housed)
  const housedStudents = allBeds.filter((b) => b.status === "occupied").length;

  const campaignPercent = fundingPercent(stats.totalRaised, stats.totalTarget);
  const featuredBeds = beds.slice(0, 3);

  return (
    <HomePageClient
      stats={stats}
      featuredBeds={featuredBeds}
      campaignPercent={campaignPercent}
      housedStudents={housedStudents}
    />
  );
}
