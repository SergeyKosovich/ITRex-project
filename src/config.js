const PORT = process.env.PORT ?? 3000;
const WS_PORT = process.env.WS_PORT ?? 8080;
const REDIS_PORT = process.env.REDIS_PORT ?? 6379;
const storageType = process.env.MEMORY_TYPE ?? 3;
const TtldefaultInSeconds = process.env.TTL ?? 30;
const PostgresHost = process.env.POST_HOST ?? 'localhost';
export {
  PORT, WS_PORT, REDIS_PORT, storageType, TtldefaultInSeconds, PostgresHost,
};
