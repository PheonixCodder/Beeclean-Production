import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Initialize Redis client from environment variables
// Expected env vars: UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN
const redis = Redis.fromEnv();

// Rate limit configurations
export const ratelimits = {
  // Public read endpoints: 100 requests per 10 seconds per IP
  public: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(100, "10 s"),
  }),

  // Authenticated write endpoints: 50 requests per 10 seconds per user ID
  write: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(50, "10 s"),
  }),

  // File upload endpoints: 10 requests per 10 minutes per IP
  upload: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(10, "10 m"),
  }),
};

/**
 * Check if the request is within rate limit
 * @param identifier - Unique identifier (IP address or user ID)
 * @param type - Rate limit type: 'public', 'write', or 'upload'
 * @returns Promise<boolean> - true if allowed, false if rate limited
 */
export async function checkRateLimit(
  identifier: string,
  type: "public" | "write" | "upload" = "public",
): Promise<boolean> {
  const limiter = ratelimits[type];
  const { success } = await limiter.limit(identifier);
  return success;
}

/**
 * Get rate limit headers for response
 * Useful for informing clients of their limits
 */
export async function getRateLimitHeaders(
  identifier: string,
  type: "public" | "write" | "upload" = "public",
): Promise<Record<string, string>> {
  const limiter = ratelimits[type];
  const info = await limiter.getRemaining(identifier);

  return {
    "X-RateLimit-Limit": info.limit.toString(),
    "X-RateLimit-Remaining": info.remaining.toString(),
    "X-RateLimit-Reset": Math.floor(info.reset * 1000).toString(),
  };
}
