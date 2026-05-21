import { pgTable, text, serial, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const roleEnum = pgEnum("role", ["founder", "investor"]);

export const usersTable = pgTable("users", {
  id:           serial("id").primaryKey(),
  name:         text("name"),
  email:        text("email").unique(),
  phone:        text("phone").unique(),
  role:         roleEnum("role").notNull(),
  googleId:     text("google_id").unique(),
  avatarUrl:    text("avatar_url"),
  company:      text("company"),
  bio:          text("bio"),
  createdAt:    timestamp("created_at").defaultNow().notNull(),
  updatedAt:    timestamp("updated_at").defaultNow().notNull(),
});

export const otpTable = pgTable("otp_codes", {
  id:        serial("id").primaryKey(),
  contact:   text("contact").notNull(),   // email or phone
  code:      text("code").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  used:      text("used").default("false"),
});

export const sessionsTable = pgTable("sessions", {
  id:        serial("id").primaryKey(),
  userId:    serial("user_id").references(() => usersTable.id),
  token:     text("token").unique().notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(usersTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof usersTable.$inferSelect;
