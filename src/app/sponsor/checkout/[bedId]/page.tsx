import { notFound } from "next/navigation";
import { CheckoutForm } from "@/components/sponsor/checkout-form";
import { getBedById } from "@/modules/sponsor/queries";

type Params = Promise<{ bedId: string }>;

export default async function CheckoutPage({ params }: { params: Params }) {
  const { bedId } = await params;
  const bed = await getBedById(bedId);

  if (!bed) notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold">Sponsorship checkout</h1>
      <p className="mt-2 text-stone-600">
        {bed.blockName} · Room {bed.roomNumber} · Bed {bed.bedLabel}
      </p>
      <div className="mt-8">
        <CheckoutForm bed={bed} />
      </div>
    </div>
  );
}
