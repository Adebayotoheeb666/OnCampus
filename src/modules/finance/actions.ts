"use server";

import { nanoid } from "nanoid";
import { db } from "@/db";
import { opexEntries, auditLog } from "@/db/schema";
import { z } from "zod";

const opexSchema = z.object({
  category: z.enum(["utilities", "staff", "security", "misc"]),
  amount: z.number().int().positive(),
  description: z.string().optional(),
  incurredAt: z.string(),
  enteredBy: z.string().default("admin"),
});

export async function createOpexEntry(input: unknown) {
  const parsed = opexSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false as const, error: parsed.error.errors[0]?.message ?? "Invalid input" };
  }

  const data = parsed.data;
  const id = `opex_${nanoid(12)}`;
  const now = new Date();

  await db.insert(opexEntries).values({
    id,
    category: data.category,
    amount: data.amount,
    description: data.description ?? null,
    incurredAt: new Date(data.incurredAt),
    enteredBy: data.enteredBy,
  });

  await db.insert(auditLog).values({
    id: `audit_${nanoid(12)}`,
    action: "opex_entry_created",
    targetEntity: "opex_entries",
    targetId: id,
    metadata: JSON.stringify({ category: data.category, amount: data.amount }),
    createdAt: now,
  });

  return { success: true as const, id };
}
