require("dotenv").config();
import Redis from "ioredis";

const redis = new Redis({
  host: process.env.REDIS_DEFAULT_HOST,
  port: process.env.REDIS_DEFAULT_PORT,
  db: process.env.REDIS_DEFAULT_DB_NAME,
  retry_strategy: (options) => {
    return Math.max(options.attempt * 100, 3000);
  },
});

export default redis;
