import { Card, CardTitle } from "@/components/ui/card";
import { getCampaignStats, getPublishedImpactStories } from "@/modules/sponsor/queries";

export default async function ImpactPage() {
  const [stats, stories] = await Promise.all([
    getCampaignStats(),
    getPublishedImpactStories(),
  ]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold">Impact reports</h1>
      <p className="mt-2 text-stone-600">
        Real outcomes from the Sponsor a Bed initiative — published only with student consent.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <Card>
          <p className="text-2xl font-bold text-emerald-800">{stats.fundedBeds}</p>
          <p className="text-sm text-stone-600">100L students housed</p>
        </Card>
        <Card>
          <p className="text-2xl font-bold text-emerald-800">
            {stats.totalBeds > 0
              ? Math.round((stats.fundedBeds / stats.totalBeds) * 100)
              : 0}
            %
          </p>
          <p className="text-sm text-stone-600">Occupancy rate (pilot)</p>
        </Card>
        <Card>
          <p className="text-2xl font-bold text-emerald-800">—</p>
          <p className="text-sm text-stone-600">Sponsor retention (coming soon)</p>
        </Card>
      </div>

      <section className="mt-12">
        <h2 className="text-xl font-semibold">Student stories</h2>
        {stories.length > 0 ? (
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {stories.map((story) => (
              <Card key={story.id}>
                <CardTitle>{story.title}</CardTitle>
                <p className="mt-2 text-sm text-stone-600">{story.excerpt}</p>
                {story.sponsorAttribution && (
                  <p className="mt-3 text-xs text-stone-500">
                    Sponsored by {story.sponsorAttribution}
                  </p>
                )}
              </Card>
            ))}
          </div>
        ) : (
          <p className="mt-4 rounded-xl border border-dashed border-stone-300 p-8 text-center text-stone-500">
            Impact stories will appear here once students grant consent and content is published.
          </p>
        )}
      </section>
    </div>
  );
}
