import { pgTable, text, serial, integer, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  mobile: text("mobile").notNull(),
  isAdmin: boolean("is_admin").default(false),
  credits: integer("credits").default(0),
});

export const subscriptions = pgTable("subscriptions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  plan: text("plan").notNull(), // law_firms_premium, law_firms_professional, judges_premium, judges_professional, students_premium, students_professional
  creditsPerMonth: integer("credits_per_month").notNull(),
  price: integer("price").notNull(), // Monthly price in cents
  yearlyPrice: integer("yearly_price").notNull(), // Yearly price in cents
  features: text("features").array().notNull(),
  active: boolean("active").default(true),
  trialStartDate: timestamp("trial_start_date"),
  trialEndDate: timestamp("trial_end_date"),
  trialDailyCredits: integer("trial_daily_credits"),
  isTrialActive: boolean("is_trial_active").default(false),
});

export const consultations = pgTable("consultations", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  subscriptionId: integer("subscription_id"),
  message: text("message").notNull(),
  timestamp: timestamp("timestamp").defaultNow(),
  charCount: integer("char_count").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  name: true,
  email: true,
  mobile: true,
});

export const insertSubscriptionSchema = createInsertSchema(subscriptions).pick({
  userId: true,
  plan: true,
  creditsPerMonth: true,
  price: true,
  yearlyPrice: true,
  features: true,
  trialDailyCredits: true,
});

export const insertConsultationSchema = createInsertSchema(consultations).pick({
  userId: true,
  subscriptionId: true,
  message: true,
  charCount: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Subscription = typeof subscriptions.$inferSelect;
export type Consultation = typeof consultations.$inferSelect;

// Subscription Plan Types
export const SUBSCRIPTION_PLANS = {
  LAW_FIRMS: {
    PREMIUM: {
      id: 'law_firms_premium',
      monthlyPrice: 29900, // $299
      yearlyPrice: 299900, // $2,999
      credits: 2000000, // 2M characters
      features: [
        'تحليل العقود والأحكام',
        'دعم فني متميز',
        'تقارير مفصلة'
      ]
    },
    PROFESSIONAL: {
      id: 'law_firms_professional',
      monthlyPrice: 79900, // $799
      yearlyPrice: 799900, // $7,999
      credits: 10000000, // 10M characters
      features: [
        'تحليل العقود والأحكام',
        'دعم فني متميز',
        'تقارير مفصلة'
      ]
    }
  },
  JUDGES: {
    PREMIUM: {
      id: 'judges_premium',
      monthlyPrice: 9900, // $99
      yearlyPrice: 99900, // $999
      credits: 500000, // 500K characters
      features: [
        'تحليل محدود للمستندات',
        'دعم قياسي',
        'تقارير استخدام'
      ]
    },
    PROFESSIONAL: {
      id: 'judges_professional',
      monthlyPrice: 29900, // $299
      yearlyPrice: 299900, // $2,999
      credits: 2000000, // 2M characters
      features: [
        'تحليل محدود للمستندات',
        'دعم قياسي',
        'تقارير استخدام'
      ]
    }
  },
  STUDENTS: {
    PREMIUM: {
      id: 'students_premium',
      monthlyPrice: 1900, // $19
      yearlyPrice: 4900, // $49
      credits: 100000, // 100K characters
      features: [
        'بدون تحليل مستندات',
        'دعم بالبريد',
        'تقارير محدودة'
      ]
    },
    PROFESSIONAL: {
      id: 'students_professional',
      monthlyPrice: 19900, // $199
      yearlyPrice: 49900, // $499
      credits: 500000, // 500K characters
      features: [
        'بدون تحليل مستندات',
        'دعم بالبريد',
        'تقارير محدودة'
      ]
    }
  }
};