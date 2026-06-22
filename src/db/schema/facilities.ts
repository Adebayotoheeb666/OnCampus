import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const assets = sqliteTable("assets", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  installDate: integer("install_date", { mode: "timestamp_ms" }),
  lastServiced: integer("last_serviced", { mode: "timestamp_ms" }),
  serviceIntervalDays: integer("service_interval_days"),
});

export const maintenanceSchedules = sqliteTable("maintenance_schedules", {
  id: text("id").primaryKey(),
  assetId: text("asset_id")
    .notNull()
    .references(() => assets.id),
  scheduledDate: integer("scheduled_date", { mode: "timestamp_ms" }).notNull(),
  status: text("status", {
    enum: ["scheduled", "completed", "overdue"],
  }).default("scheduled"),
  cost: integer("cost"),
  vendor: text("vendor"),
});
