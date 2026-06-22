import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, CardTitle } from "@/components/ui/card";
import { formatNaira } from "@/lib/utils";
import { getInvoiceById } from "@/modules/payments/queries";
import { confirmInvoicePayment } from "@/modules/payments/actions";

type Params = Promise<{ invoiceId: string }>;
type SearchParams = Promise<{ demo?: string; ref?: string }>;

export default async function ResidentPaymentPage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  const { invoiceId } = await params;
  const { demo, ref } = await searchParams;

  if (demo === "1" && ref) {
    const invoice = await getInvoiceById(invoiceId);
    if (invoice) {
      const remaining = invoice.amountDue - (invoice.amountPaid ?? 0);
      await confirmInvoicePayment(invoiceId, remaining, ref);
    }
  }

  const invoice = await getInvoiceById(invoiceId);
  if (!invoice) notFound();

  const remaining = invoice.amountDue - (invoice.amountPaid ?? 0);

  return (
    <div className="mx-auto max-w-md px-4 py-16 text-center">
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-2xl">
        {invoice.status === "paid" ? "✓" : "…"}
      </div>
      <h1 className="text-2xl font-bold">
        {invoice.status === "paid" ? "Payment confirmed" : "Payment processing"}
      </h1>
      {demo && (
        <p className="mt-2 text-sm text-stone-500">Demo mode: payment simulated successfully.</p>
      )}
      <Card className="mt-8 text-left">
        <CardTitle className="capitalize">{invoice.invoiceType} invoice</CardTitle>
        <dl className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-stone-600">Amount</dt>
            <dd>{formatNaira(invoice.amountDue)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-stone-600">Paid</dt>
            <dd>{formatNaira(invoice.amountPaid ?? 0)}</dd>
          </div>
          {remaining > 0 && invoice.status !== "paid" && (
            <div className="flex justify-between">
              <dt className="text-stone-600">Remaining</dt>
              <dd className="font-semibold">{formatNaira(remaining)}</dd>
            </div>
          )}
          <div className="flex justify-between">
            <dt className="text-stone-600">Status</dt>
            <dd className="capitalize">{invoice.status?.replace("_", " ")}</dd>
          </div>
        </dl>
      </Card>
      <Link href="/resident" className="mt-6 inline-block text-sm text-emerald-800 hover:underline">
        Back to resident portal
      </Link>
    </div>
  );
}
