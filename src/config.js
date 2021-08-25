const PORT = process.env.PORT ?? 3000;
const WS_PORT = process.env.WS_PORT ?? 8080;
const REDIS_PORT = process.env.REDIS_PORT ?? 6379;
const StorageType = process.env.MEMORY_TYPE ?? 3;
const TtlDefaultInSeconds = process.env.TTL ?? 300;
const SqlHost = process.env.POST_HOST ?? 'localhost';
export {
  PORT, WS_PORT, REDIS_PORT, StorageType, TtlDefaultInSeconds, SqlHost,
};
