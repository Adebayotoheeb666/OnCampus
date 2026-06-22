import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const blocks = sqliteTable("blocks", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  gender: text("gender", { enum: ["male", "female", "mixed"] }).notNull(),
  totalRooms: integer("total_rooms").notNull(),
});

export const rooms = sqliteTable("rooms", {
  id: text("id").primaryKey(),
  blockId: text("block_id")
    .notNull()
    .references(() => blocks.id),
  roomNumber: text("room_number").notNull(),
  capacity: integer("capacity").notNull(),
});

export const beds = sqliteTable("beds", {
  id: text("id").primaryKey(),
  roomId: text("room_id")
    .notNull()
    .references(() => rooms.id),
  bedLabel: text("bed_label").notNull(),
  fundingType: text("funding_type", {
    enum: ["sponsored_target", "paid"],
  }).notNull(),
  status: text("status", {
    enum: ["available", "sponsored", "occupied", "maintenance"],
  }).default("available"),
  currentTenantId: text("current_tenant_id"),
  targetAmountKobo: integer("target_amount_kobo").notNull().default(0),
  fundedAmountKobo: integer("funded_amount_kobo").notNull().default(0),
});
