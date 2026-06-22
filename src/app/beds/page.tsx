import { BedCard } from "@/components/sponsor/bed-card";
import { getAvailableBeds, getBlocks } from "@/modules/sponsor/queries";

type SearchParams = Promise<{ block?: string; gender?: string; status?: string }>;

export default async function BedsPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const [beds, blocks] = await Promise.all([
    getAvailableBeds({
      blockId: params.block,
      gender: params.gender,
      status: params.status,
    }),
    getBlocks(),
  ]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Bed funding catalogue</h1>
        <p className="mt-2 text-stone-600">
          Browse open beds across pilot blocks and fund one that speaks to you.
        </p>
      </div>

      <form className="mb-8 flex flex-wrap gap-3">
        <select
          name="block"
          defaultValue={params.block ?? ""}
          className="rounded-lg border border-stone-200 px-3 py-2 text-sm"
        >
          <option value="">All blocks</option>
          {blocks.map((b) => (
            <option key={b.id} value={b.id}>
              {b.name}
            </option>
          ))}
        </select>
        <select
          name="gender"
          defaultValue={params.gender ?? ""}
          className="rounded-lg border border-stone-200 px-3 py-2 text-sm"
        >
          <option value="">All genders</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="mixed">Mixed</option>
        </select>
        <select
          name="status"
          defaultValue={params.status ?? ""}
          className="rounded-lg border border-stone-200 px-3 py-2 text-sm"
        >
          <option value="">All statuses</option>
          <option value="available">Open</option>
          <option value="sponsored">Partially funded</option>
        </select>
        <button
          type="submit"
          className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-800"
        >
          Filter
        </button>
      </form>

      {beds.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {beds.map((bed) => (
            <BedCard key={bed.id} bed={bed} />
          ))}
        </div>
      ) : (
        <p className="rounded-xl border border-dashed border-stone-300 p-12 text-center text-stone-500">
          No beds match your filters. Try adjusting filters or seed the database.
        </p>
      )}
    </div>
  );
}
