import { AdminNav } from "@/components/layout/admin-nav";
import { BedInventoryGrid } from "@/components/admin/bed-inventory-grid";
import { getBedInventory } from "@/modules/allocation/queries";
import { getBlocks } from "@/modules/sponsor/queries";

type SearchParams = Promise<{ block?: string; gender?: string; status?: string }>;

export default async function AdminBedsPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const [beds, blocks] = await Promise.all([
    getBedInventory({ blockId: params.block, gender: params.gender, status: params.status }),
    getBlocks(),
  ]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <AdminNav active="/admin/beds" />
      <h1 className="text-3xl font-bold">Bed inventory</h1>
      <p className="mt-2 text-stone-600">Real-time map of every bed and its status across pilot blocks.</p>

      <form className="mt-6 flex flex-wrap gap-3">
        <select name="block" defaultValue={params.block ?? ""} className="rounded-lg border border-stone-200 px-3 py-2 text-sm">
          <option value="">All blocks</option>
          {blocks.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
        </select>
        <select name="gender" defaultValue={params.gender ?? ""} className="rounded-lg border border-stone-200 px-3 py-2 text-sm">
          <option value="">All genders</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="mixed">Mixed</option>
        </select>
        <select name="status" defaultValue={params.status ?? ""} className="rounded-lg border border-stone-200 px-3 py-2 text-sm">
          <option value="">All statuses</option>
          <option value="available">Available</option>
          <option value="sponsored">Sponsored</option>
          <option value="occupied">Occupied</option>
          <option value="maintenance">Maintenance</option>
        </select>
        <button type="submit" className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-medium text-white">Filter</button>
      </form>

      <div className="mt-8">
        <BedInventoryGrid beds={beds} />
      </div>
    </div>
  );
}
