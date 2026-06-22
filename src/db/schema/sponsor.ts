import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { beds } from "./inventory";

const timestamp = () => integer({ mode: "timestamp_ms" }).notNull();

export const sponsors = sqliteTable("sponsors", {
  id: text("id").primaryKey(),
  type: text("type", { enum: ["individual", "organization"] }).notNull(),
  fullName: text("full_name").notNull(),
  organizationName: text("organization_name"),
  email: text("email").notNull(),
  phone: text("phone"),
  isDiaspora: integer("is_diaspora", { mode: "boolean" }).default(false),
  status: text("status", {
    enum: ["prospect", "contacted", "committed", "active", "lapsed"],
  }).default("prospect"),
  createdAt: timestamp(),
  updatedAt: timestamp(),
});

export const sponsorshipPledges = sqliteTable("sponsorship_pledges", {
  id: text("id").primaryKey(),
  sponsorId: text("sponsor_id")
    .notNull()
    .references(() => sponsors.id),
  bedId: text("bed_id").references(() => beds.id),
  tier: text("tier", {
    enum: ["full_bed", "partial", "maintenance_sub"],
  }).notNull(),
  amountPledged: integer("amount_pledged").notNull(),
  amountPaid: integer("amount_paid").default(0),
  recurring: integer("recurring", { mode: "boolean" }).default(false),
  recurrenceInterval: text("recurrence_interval"),
  status: text("status", {
    enum: ["pending", "partially_paid", "fulfilled", "cancelled"],
  }).default("pending"),
  createdAt: timestamp(),
});

export const sponsorPayments = sqliteTable("sponsor_payments", {
  id: text("id").primaryKey(),
  pledgeId: text("pledge_id")
    .notNull()
    .references(() => sponsorshipPledges.id),
  amount: integer("amount").notNull(),
  provider: text("provider", {
    enum: ["paystack", "flutterwave", "bank_transfer"],
  }).notNull(),
  providerReference: text("provider_reference"),
  status: text("status", {
    enum: ["success", "failed", "pending"],
  }).notNull(),
  paidAt: integer("paid_at", { mode: "timestamp_ms" }),
});

export const sponsorCertificates = sqliteTable("sponsor_certificates", {
  id: text("id").primaryKey(),
  pledgeId: text("pledge_id")
    .notNull()
    .references(() => sponsorshipPledges.id),
  fileUrl: text("file_url").notNull(),
  issuedAt: timestamp(),
});
