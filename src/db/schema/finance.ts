import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const opexEntries = sqliteTable("opex_entries", {
  id: text("id").primaryKey(),
  category: text("category", {
    enum: ["utilities", "staff", "security", "misc"],
  }).notNull(),
  amount: integer("amount").notNull(),
  description: text("description"),
  incurredAt: integer("incurred_at", { mode: "timestamp_ms" }).notNull(),
  enteredBy: text("entered_by").notNull(),
});
