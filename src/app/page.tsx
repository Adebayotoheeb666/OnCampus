import { getAvailableBeds, getCampaignStats } from "@/modules/sponsor/queries";
import { HomePageClient } from "./home-client";
import { fundingPercent } from "@/lib/utils";

export default async function HomePage() {
  const [stats, beds] = await Promise.all([
    getCampaignStats(),
    getAvailableBeds({ status: "available" }),
  ]);

  const campaignPercent = fundingPercent(stats.totalRaised, stats.totalTarget);
  const featuredBeds = beds.slice(0, 3);

  return (
    <HomePageClient
      stats={stats}
      featuredBeds={featuredBeds}
      campaignPercent={campaignPercent}
    />
  );
}
