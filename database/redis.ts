import config from "@/lib/config";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: config.upstash.redisUrl,
  token: config.upstash.redisToken,
});

export default redis;
