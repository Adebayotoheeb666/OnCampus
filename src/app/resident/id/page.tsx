import QRCode from "react-qr-code";
import { Card, CardTitle } from "@/components/ui/card";
import { ResidentNav } from "@/components/layout/resident-nav";
import { requireResidentContext } from "@/lib/resident/context";

export default async function ResidentIdPage() {
  const ctx = await requireResidentContext();
  const qrPayload = JSON.stringify({
    tenantId: ctx.tenant.id,
    name: ctx.applicant.fullName,
    block: ctx.blockName,
    room: ctx.roomNumber,
    bed: ctx.bedLabel,
  });

  return (
    <div className="mx-auto max-w-md px-4 py-10 text-center">
      <ResidentNav active="/resident/id" />
      <Card>
        <CardTitle>Digital resident ID</CardTitle>
        <p className="mt-2 text-sm text-stone-600">Show this QR code at the gate for check-in.</p>
        <div className="mx-auto mt-6 w-fit rounded-xl bg-white p-4 shadow-inner">
          <QRCode value={qrPayload} size={200} />
        </div>
        <dl className="mt-6 space-y-1 text-left text-sm">
          <div className="flex justify-between"><dt className="text-stone-600">Name</dt><dd>{ctx.applicant.fullName}</dd></div>
          <div className="flex justify-between"><dt className="text-stone-600">Location</dt><dd>{ctx.blockName} · {ctx.roomNumber} · Bed {ctx.bedLabel}</dd></div>
          <div className="flex justify-between"><dt className="text-stone-600">Status</dt><dd className="capitalize text-emerald-700">{ctx.tenant.status}</dd></div>
        </dl>
      </Card>
    </div>
  );
}
