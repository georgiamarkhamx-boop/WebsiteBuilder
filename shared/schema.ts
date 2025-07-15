import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(), // bcrypt hashed
  companyName: text("company_name"),
  employeeCount: text("employee_count"),
  role: text("role"),
  department: text("department"),
  subscriptionTier: text("subscription_tier").default("basic"),
  isActive: boolean("is_active").default(true),
  mfaSecret: text("mfa_secret"), // TOTP secret for MFA
  mfaEnabled: boolean("mfa_enabled").default(false),
  lastLogin: timestamp("last_login"),
  loginAttempts: integer("login_attempts").default(0),
  lockedUntil: timestamp("locked_until"),
  passwordResetToken: text("password_reset_token"),
  passwordResetExpires: timestamp("password_reset_expires"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  duration: integer("duration").notNull(), // in minutes
  difficulty: text("difficulty").notNull(),
  tags: text("tags").array(),
  icon: text("icon"),
  isPopular: boolean("is_popular").default(false),
  isNew: boolean("is_new").default(false),
  content: jsonb("content"), // Course content structure
});

export const enrollments = pgTable("enrollments", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  courseId: integer("course_id").references(() => courses.id),
  progress: integer("progress").default(0), // percentage
  completed: boolean("completed").default(false),
  score: integer("score"),
  enrolledAt: timestamp("enrolled_at").defaultNow(),
  completedAt: timestamp("completed_at"),
});

export const assessments = pgTable("assessments", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  type: text("type").notNull(), // "maturity", "quiz", etc.
  answers: jsonb("answers"),
  score: integer("score"),
  results: jsonb("results"),
  completedAt: timestamp("completed_at").defaultNow(),
});

export const certificates = pgTable("certificates", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  courseId: integer("course_id").references(() => courses.id),
  certificateId: text("certificate_id").notNull().unique(),
  issuedAt: timestamp("issued_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  email: true,
  password: true,
  companyName: true,
  employeeCount: true,
});

export const insertCourseSchema = createInsertSchema(courses).pick({
  title: true,
  description: true,
  category: true,
  duration: true,
  difficulty: true,
  tags: true,
  icon: true,
  isPopular: true,
  isNew: true,
  content: true,
});

export const insertEnrollmentSchema = createInsertSchema(enrollments).pick({
  userId: true,
  courseId: true,
  progress: true,
  completed: true,
  score: true,
});

export const insertAssessmentSchema = createInsertSchema(assessments).pick({
  userId: true,
  type: true,
  answers: true,
  score: true,
  results: true,
});

export const insertCertificateSchema = createInsertSchema(certificates).pick({
  userId: true,
  courseId: true,
  certificateId: true,
});

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Course = typeof courses.$inferSelect;
export type InsertCourse = z.infer<typeof insertCourseSchema>;
export type Enrollment = typeof enrollments.$inferSelect;
export type InsertEnrollment = z.infer<typeof insertEnrollmentSchema>;
export type Assessment = typeof assessments.$inferSelect;
export type InsertAssessment = z.infer<typeof insertAssessmentSchema>;
export type Certificate = typeof certificates.$inferSelect;
export type InsertCertificate = z.infer<typeof insertCertificateSchema>;
