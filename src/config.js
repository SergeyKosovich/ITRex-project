import dotenv from 'dotenv';

dotenv.config();
const PORT = process.env.PORT ?? 3000;
const WS_PORT = process.env.WS_PORT ?? 8080;
const REDIS_HOST = process.env.REDIS_HOST ?? 6379;
const queueStorage = process.env.QUE_TYPE ?? 2;
const TtlDefaultInSeconds = process.env.TTL ?? 300;
const secretKey = process.env.SECRET_KEY ?? 'SECRET_KEY';
export {
  PORT,
  WS_PORT,
  REDIS_HOST,
  TtlDefaultInSeconds,
  queueStorage,
  secretKey,
};
