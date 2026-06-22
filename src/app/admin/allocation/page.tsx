import { AdminNav } from "@/components/layout/admin-nav";
import { AllocationReviewTable } from "@/components/admin/allocation-review-table";
import { getApplicants, getAvailableBedsForAllocation } from "@/modules/allocation/queries";

export default async function AdminAllocationPage() {
  const [applicants, freeBeds, paidBeds] = await Promise.all([
    getApplicants(),
    getAvailableBedsForAllocation("free_bed"),
    getAvailableBedsForAllocation("paid_bed"),
  ]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <AdminNav active="/admin/allocation" />
      <h1 className="text-3xl font-bold">Allocation review</h1>
      <p className="mt-2 text-stone-600">
        Review applications, run allocation cycles, and manually assign beds.
        {freeBeds.length} sponsored beds · {paidBeds.length} paid beds available.
      </p>
      <div className="mt-8">
        <AllocationReviewTable applicants={applicants} availableBeds={[...freeBeds, ...paidBeds]} />
      </div>
    </div>
  );
}
