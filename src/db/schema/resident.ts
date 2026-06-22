import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { tenants } from "./allocation";

const timestamp = () => integer({ mode: "timestamp_ms" }).notNull();

export const maintenanceRequests = sqliteTable("maintenance_requests", {
  id: text("id").primaryKey(),
  tenantId: text("tenant_id")
    .notNull()
    .references(() => tenants.id),
  category: text("category", {
    enum: ["plumbing", "electrical", "structural", "other"],
  }).notNull(),
  description: text("description").notNull(),
  photoUrl: text("photo_url"),
  priority: text("priority", {
    enum: ["low", "normal", "high", "urgent"],
  }).default("normal"),
  status: text("status", {
    enum: ["open", "assigned", "in_progress", "resolved"],
  }).default("open"),
  assignedTo: text("assigned_to"),
  createdAt: timestamp(),
  resolvedAt: integer("resolved_at", { mode: "timestamp_ms" }),
});

export const laundromatMachines = sqliteTable("laundromat_machines", {
  id: text("id").primaryKey(),
  machineLabel: text("machine_label").notNull(),
  status: text("status", {
    enum: ["available", "in_use", "out_of_order"],
  }).default("available"),
});

export const laundromatBookings = sqliteTable("laundromat_bookings", {
  id: text("id").primaryKey(),
  machineId: text("machine_id")
    .notNull()
    .references(() => laundromatMachines.id),
  tenantId: text("tenant_id")
    .notNull()
    .references(() => tenants.id),
  slotStart: integer("slot_start", { mode: "timestamp_ms" }).notNull(),
  slotEnd: integer("slot_end", { mode: "timestamp_ms" }).notNull(),
  status: text("status", {
    enum: ["booked", "completed", "no_show", "cancelled"],
  }).default("booked"),
});

export const announcements = sqliteTable("announcements", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  body: text("body").notNull(),
  audience: text("audience", {
    enum: ["all", "block_specific", "gender_specific"],
  }).default("all"),
  publishedAt: timestamp(),
});

export const visitorLogs = sqliteTable("visitor_logs", {
  id: text("id").primaryKey(),
  tenantId: text("tenant_id")
    .notNull()
    .references(() => tenants.id),
  visitorName: text("visitor_name").notNull(),
  visitorPhone: text("visitor_phone"),
  expectedArrival: integer("expected_arrival", { mode: "timestamp_ms" }),
  checkedInAt: integer("checked_in_at", { mode: "timestamp_ms" }),
  checkedOutAt: integer("checked_out_at", { mode: "timestamp_ms" }),
  status: text("status", {
    enum: ["expected", "checked_in", "checked_out", "no_show"],
  }).default("expected"),
});
