const PORT = process.env.PORT ?? 3000;
const WS_PORT = process.env.WS_PORT ?? 8080;
const REDIS_HOST = process.env.REDIS_HOST ?? 6379;
const resolutionsStorage = process.env.RES_TYPE ?? 3;
const queueStorage = process.env.QUE_TYPE ?? 2;
const TtlDefaultInSeconds = process.env.TTL ?? 300;
const SqlHost = process.env.POST_HOST ?? "localhost";
const secretKey = "SECRET_KEY";
const tokenAge = "30m";
export {
  PORT,
  WS_PORT,
  REDIS_HOST,
  resolutionsStorage,
  TtlDefaultInSeconds,
  SqlHost,
  queueStorage,
  secretKey,
  tokenAge,
};
