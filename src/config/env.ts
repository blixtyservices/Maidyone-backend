import { config } from "dotenv";
import { z } from "zod";

config();

/* ============================================================================
                                ENVIRONMENT SCHEMA
============================================================================ */

const envSchema = z.object({
  /* ==========================================================================
     APPLICATION
  ========================================================================== */

  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  PORT: z.coerce.number().default(5000),

  CLIENT_URL: z.string().default("*"),

  LOG_LEVEL: z
    .enum([
      "fatal",
      "error",
      "warn",
      "info",
      "debug",
      "trace",
      "silent",
    ])
    .default("info"),

  /* ==========================================================================
     DATABASE
  ========================================================================== */

  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),

  /* ==========================================================================
     JWT
  ========================================================================== */

  JWT_SECRET: z
    .string()
    .min(10, "JWT_SECRET must be at least 10 characters"),

  JWT_REFRESH_SECRET: z
    .string()
    .min(10, "JWT_REFRESH_SECRET must be at least 10 characters"),

  JWT_EXPIRES_IN: z.string().default("7d"),

  REFRESH_EXPIRES_IN: z.string().default("30d"),

  /* ==========================================================================
     REDIS
  ========================================================================== */

  REDIS_HOST: z.string().default("localhost"),

  REDIS_PORT: z.coerce.number().default(6379),

  REDIS_PASSWORD: z.string().optional().or(z.literal("")),

  /* ==========================================================================
     FIREBASE
  ========================================================================== */

  FIREBASE_PROJECT_ID: z.string().optional().or(z.literal("")),

  FIREBASE_CLIENT_EMAIL: z.string().optional().or(z.literal("")),

  FIREBASE_PRIVATE_KEY: z.string().optional().or(z.literal("")),

  /* ==========================================================================
     RAZORPAY
  ========================================================================== */

  RAZORPAY_KEY_ID: z.string().optional().or(z.literal("")),

  RAZORPAY_KEY_SECRET: z.string().optional().or(z.literal("")),

  /* ==========================================================================
     CLOUDINARY
  ========================================================================== */

  CLOUDINARY_CLOUD_NAME: z.string().optional().or(z.literal("")),

  CLOUDINARY_API_KEY: z.string().optional().or(z.literal("")),

  CLOUDINARY_API_SECRET: z.string().optional().or(z.literal("")),

  /* ==========================================================================
     EMAIL (SMTP)
  ========================================================================== */

  SMTP_HOST: z.string().optional().or(z.literal("")),

  SMTP_PORT: z.coerce.number().optional(),

  SMTP_USER: z.string().optional().or(z.literal("")),

  SMTP_PASSWORD: z.string().optional().or(z.literal("")),
});

/* ============================================================================
                                VALIDATE ENV
============================================================================ */

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("\n❌ Invalid Environment Variables\n");

  console.table(parsed.error.flatten().fieldErrors);

  process.exit(1);
}

/* ============================================================================
                                EXPORT
============================================================================ */

export const env = parsed.data;

export type Env = typeof env;