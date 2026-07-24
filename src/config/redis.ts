import { createClient } from "redis";
import { env } from "./env";
import { logger } from "../common/logger";

export const redis = createClient({
  socket: {
    host: env.REDIS_HOST,
    port: env.REDIS_PORT,
  },

  password: env.REDIS_PASSWORD || undefined,
});

redis.on("connect", () => {
  logger.info("✅ Redis Connected");
});

redis.on("ready", () => {
  logger.info("🚀 Redis Ready");
});

redis.on("error", (error) => {
  logger.error(error);
});

redis.on("reconnecting", () => {
  logger.warn("Redis reconnecting...");
});

export async function connectRedis() {
  if (!redis.isOpen) {
    await redis.connect();
  }
}