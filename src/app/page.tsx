import { HeroSection } from "@/components/home/hero-section";
import { HowItWorks } from "@/components/home/how-it-works";
import { InventorySection } from "@/components/home/inventory-section";
import { ImpactSection } from "@/components/home/impact-section";
import { fundingPercent } from "@/lib/utils";
import { getAvailableBeds, getCampaignStats } from "@/modules/sponsor/queries";
import type { BedWithLocation } from "@/modules/sponsor/queries";

export default async function HomePage() {
  let stats = {
    totalBeds: 0,
    fundedBeds: 0,
    totalRaised: 0,
    totalTarget: 0,
  };
  let beds: BedWithLocation[] = [];

  try {
    const results = await Promise.all([
      getCampaignStats(),
      getAvailableBeds({ status: "available" }),
    ]);
    stats = results[0];
    beds = results[1];
  } catch (error) {
    console.error("[v0] Database error:", error);
    // Continue with default values for demo purposes
  }

  const campaignPercent = fundingPercent(stats.totalRaised, stats.totalTarget);

  return (
    <>
      <HeroSection
        campaignPercent={campaignPercent}
        totalRaised={stats.totalRaised}
        totalTarget={stats.totalTarget}
        fundedBeds={stats.fundedBeds}
      />
      <HowItWorks />
      <InventorySection beds={beds} />
      <ImpactSection />
    </>
  );
}
