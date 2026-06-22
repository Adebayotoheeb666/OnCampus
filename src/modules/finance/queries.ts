import { sql, eq, and, gte, lte } from "drizzle-orm";
import { db } from "@/db";
import {
  sponsorPayments,
  payments,
  invoices,
  opexEntries,
  beds,
} from "@/db/schema";

export type FinancePeriod = {
  start: Date;
  end: Date;
  label: string;
};

export function getDefaultPeriod(): FinancePeriod {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
  return {
    start,
    end,
    label: start.toLocaleDateString("en-NG", { month: "long", year: "numeric" }),
  };
}

export async function getFinanceOverview(period: FinancePeriod) {
  const startMs = period.start.getTime();
  const endMs = period.end.getTime();

  const [sponsorRevenue] = await db
    .select({ total: sql<number>`coalesce(sum(${sponsorPayments.amount}), 0)` })
    .from(sponsorPayments)
    .where(
      and(
        eq(sponsorPayments.status, "success"),
        gte(sponsorPayments.paidAt, new Date(startMs)),
        lte(sponsorPayments.paidAt, new Date(endMs)),
      ),
    );

  const [rentRevenue] = await db
    .select({ total: sql<number>`coalesce(sum(${payments.amount}), 0)` })
    .from(payments)
    .innerJoin(invoices, eq(payments.invoiceId, invoices.id))
    .where(
      and(
        eq(payments.status, "success"),
        gte(payments.paidAt, new Date(startMs)),
        lte(payments.paidAt, new Date(endMs)),
      ),
    );

  const [opex] = await db
    .select({ total: sql<number>`coalesce(sum(${opexEntries.amount}), 0)` })
    .from(opexEntries)
    .where(
      and(
        gte(opexEntries.incurredAt, new Date(startMs)),
        lte(opexEntries.incurredAt, new Date(endMs)),
      ),
    );

  const [bedCounts] = await db
    .select({
      sponsored: sql<number>`sum(case when ${beds.fundingType} = 'sponsored_target' then 1 else 0 end)`,
      occupiedPaid: sql<number>`sum(case when ${beds.fundingType} = 'paid' and ${beds.status} = 'occupied' then 1 else 0 end)`,
      occupiedFree: sql<number>`sum(case when ${beds.fundingType} = 'sponsored_target' and ${beds.status} = 'occupied' then 1 else 0 end)`,
    })
    .from(beds);

  const totalRevenue = (sponsorRevenue?.total ?? 0) + (rentRevenue?.total ?? 0);
  const totalOpex = opex?.total ?? 0;
  const freeBedCount = bedCounts?.occupiedFree ?? 0;
  const paidBedCount = bedCounts?.occupiedPaid ?? 0;

  // Simplified coverage: revenue per period vs estimated free-bed cost (full bed tier / session months)
  const estimatedFreeBedCostPerMonth = 350_000_00 / 9;
  const freeBedCost = freeBedCount * estimatedFreeBedCostPerMonth;
  const coverageRatio = freeBedCost > 0 ? totalRevenue / freeBedCost : 1;

  return {
    totalRevenue,
    sponsorRevenue: sponsorRevenue?.total ?? 0,
    rentRevenue: rentRevenue?.total ?? 0,
    totalOpex,
    netPosition: totalRevenue - totalOpex,
    freeBedCoverageRatio: Math.min(coverageRatio, 2),
    freeBedCount,
    paidBedCount,
    sponsoredBedCount: bedCounts?.sponsored ?? 0,
  };
}

export async function getRevenueBreakdown(period: FinancePeriod) {
  const startMs = period.start.getTime();
  const endMs = period.end.getTime();

  const sponsorRows = await db
    .select({
      id: sponsorPayments.id,
      amount: sponsorPayments.amount,
      paidAt: sponsorPayments.paidAt,
      reference: sponsorPayments.providerReference,
      pledgeId: sponsorPayments.pledgeId,
    })
    .from(sponsorPayments)
    .where(
      and(
        eq(sponsorPayments.status, "success"),
        gte(sponsorPayments.paidAt, new Date(startMs)),
        lte(sponsorPayments.paidAt, new Date(endMs)),
      ),
    );

  const rentRows = await db
    .select({
      id: payments.id,
      amount: payments.amount,
      paidAt: payments.paidAt,
      reference: payments.providerReference,
      invoiceId: payments.invoiceId,
      invoiceType: invoices.invoiceType,
    })
    .from(payments)
    .innerJoin(invoices, eq(payments.invoiceId, invoices.id))
    .where(
      and(
        eq(payments.status, "success"),
        gte(payments.paidAt, new Date(startMs)),
        lte(payments.paidAt, new Date(endMs)),
      ),
    );

  return {
    sponsorships: sponsorRows.map((r) => ({ ...r, source: "sponsorship" as const })),
    rent: rentRows.map((r) => ({ ...r, source: "rent" as const })),
  };
}

export async function getOpexEntries(period?: FinancePeriod) {
  if (!period) {
    return db.select().from(opexEntries).orderBy(opexEntries.incurredAt);
  }

  return db
    .select()
    .from(opexEntries)
    .where(
      and(
        gte(opexEntries.incurredAt, period.start),
        lte(opexEntries.incurredAt, period.end),
      ),
    )
    .orderBy(opexEntries.incurredAt);
}
