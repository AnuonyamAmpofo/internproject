import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const alarms = pgTable("alarms", {
  id: serial("id").primaryKey(),
  time: text("time").notNull(),
  label: text("label"),
  isActive: boolean("is_active").default(true),
  sound: text("sound").default("Default"),
  snooze: boolean("snooze").default(true),
  repeat: text("repeat").default("Never"),
  userId: integer("user_id").references(() => users.id),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertAlarmSchema = createInsertSchema(alarms).omit({
  id: true,
  userId: true,
});