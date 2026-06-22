import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { formatNaira } from "@/lib/utils";
import { SPONSORSHIP_TIERS } from "@/lib/constants";
import {
  getPledgeByReference,
  getSponsorPaymentsForPledge,
} from "@/modules/sponsor/queries";

type Params = Promise<{ pledgeId: string }>;
type SearchParams = Promise<{ demo?: string }>;

export default async function ConfirmationPage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  const { pledgeId } = await params;
  const { demo } = await searchParams;
  const pledge = await getPledgeByReference(pledgeId);

  if (!pledge) notFound();

  const payments = await getSponsorPaymentsForPledge(pledgeId);
  const tier = SPONSORSHIP_TIERS[pledge.tier];

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center">
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-2xl">
        ✓
      </div>
      <h1 className="text-3xl font-bold">Thank you for your sponsorship!</h1>
      <p className="mt-3 text-stone-600">
        {demo
          ? "Demo mode: payment was simulated. In production, this page appears after Paystack confirms payment."
          : "Your payment is being processed. You will receive a receipt by email once confirmed."}
      </p>

      <Card className="mt-8 text-left">
        <CardTitle>Pledge reference</CardTitle>
        <dl className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-stone-600">Reference</dt>
            <dd className="font-mono">{pledge.id}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-stone-600">Tier</dt>
            <dd>{tier.label}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-stone-600">Amount</dt>
            <dd className="font-semibold">{formatNaira(pledge.amountPledged)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-stone-600">Status</dt>
            <dd className="capitalize">{pledge.status}</dd>
          </div>
          {payments[0] && (
            <div className="flex justify-between">
              <dt className="text-stone-600">Payment</dt>
              <dd className="capitalize">{payments[0].status}</dd>
            </div>
          )}
        </dl>
      </Card>

      <div className="mt-8 flex justify-center gap-4">
        <Link href="/">
          <Button variant="outline">Back to home</Button>
        </Link>
        <Link href="/sponsor/portal">
          <Button>View my pledges</Button>
        </Link>
      </div>
    </div>
  );
}
