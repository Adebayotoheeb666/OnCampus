import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { tenants } from "./allocation";
import { visitorLogs } from "./resident";

const timestamp = () => integer({ mode: "timestamp_ms" }).notNull();

export const accessLogs = sqliteTable("access_logs", {
  id: text("id").primaryKey(),
  tenantId: text("tenant_id").references(() => tenants.id),
  visitorLogId: text("visitor_log_id").references(() => visitorLogs.id),
  direction: text("direction", { enum: ["in", "out"] }).notNull(),
  gateId: text("gate_id").notNull(),
  recordedBy: text("recorded_by"),
  timestamp: timestamp(),
});

export const incidents = sqliteTable("incidents", {
  id: text("id").primaryKey(),
  reportedBy: text("reported_by").notNull(),
  category: text("category", {
    enum: ["theft", "altercation", "safety_hazard", "other"],
  }).notNull(),
  description: text("description").notNull(),
  severity: text("severity", {
    enum: ["low", "medium", "high", "critical"],
  }).default("low"),
  status: text("status", {
    enum: ["open", "investigating", "resolved"],
  }).default("open"),
  createdAt: timestamp(),
  resolvedAt: integer("resolved_at", { mode: "timestamp_ms" }),
});
