import { HeroSection } from "@/components/home/hero-section";
import { HowItWorks } from "@/components/home/how-it-works";
import { InventorySection } from "@/components/home/inventory-section";
import { ImpactSection } from "@/components/home/impact-section";
import { fundingPercent } from "@/lib/utils";
import type { BedWithLocation } from "@/modules/sponsor/queries";

export default async function HomePage() {
  const defaultStats = {
    totalBeds: 0,
    fundedBeds: 0,
    totalRaised: 0,
    totalTarget: 0,
  };
  
  let stats = defaultStats;
  let beds: BedWithLocation[] = [];

  // Try to fetch data, but don't fail the page if database is unavailable
  const statsPromise = Promise.resolve(defaultStats);

  const bedsPromise = Promise.resolve<BedWithLocation[]>([]);

  [stats, beds] = await Promise.all([statsPromise, bedsPromise]);

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
