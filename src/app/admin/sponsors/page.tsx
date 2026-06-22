import { SponsorCrmBoard } from "@/components/admin/sponsor-crm-board";
import { getSponsorsForCrm } from "@/modules/sponsor/queries";

export default async function AdminSponsorCrmPage() {
  const sponsors = await getSponsorsForCrm();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-3xl font-bold">Sponsor CRM</h1>
      <p className="mt-2 text-stone-600">
        Manage the sponsor pipeline from prospect to active. Drag-and-drop and notes are planned
        for a follow-up iteration.
      </p>
      <div className="mt-8">
        <SponsorCrmBoard sponsors={sponsors} />
      </div>
    </div>
  );
}
