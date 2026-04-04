import { z } from "zod";

const envSchema = z.object({
  // Database
  DATABASE_URL: z.string().url().optional(),

  // Authentication
  AUTH_SECRET: z.string().min(32).optional(),
  NEXTAUTH_URL: z.string().url().optional(),

  // App
  NEXT_PUBLIC_APP_URL: z.string().url().optional(),

  // Sentry
  SENTRY_DSN: z.string().url().optional(),
  NEXT_PUBLIC_SENTRY_DSN: z.string().url().optional(),

  // Upstash Redis (for rate limiting)
  UPSTASH_REDIS_REST_URL: z.string().url().optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().min(1).optional(),
});

/**
 * Validate environment variables at runtime
 * Call this in your app initialization (e.g., in layout.tsx or a startup hook)
 */
export function validateEnv() {
  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    console.error("❌ Environment variable validation failed:");
    result.error.issues.forEach((error) => {
      console.error(`  - ${error.path.join(".")}: ${error.message}`);
    });

    // In development, we can be more lenient
    if (process.env.NODE_ENV === "production") {
      throw new Error("Invalid environment configuration");
    }
  } else {
    console.log("✅ Environment variables validated successfully");
  }

  return result.data;
}
