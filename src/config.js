const PORT = process.env.PORT ?? 3000;
const WS_PORT = process.env.WS_PORT ?? 8080;
const REDIS_PORT = process.env.REDIS_PORT ?? 6379;
const storageType = process.env.MEMORY_TYPE ?? 1;
const TtldefaultInSeconds = process.env.TTL ?? 10;
export {
  PORT, WS_PORT, REDIS_PORT, storageType, TtldefaultInSeconds,
};
