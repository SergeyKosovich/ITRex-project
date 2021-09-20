import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT ?? 3000;
const WS_PORT = process.env.WS_PORT ?? 8080;
const REDIS_HOST = process.env.REDIS_HOST ?? 6379;
const resolutionsStorage = 3;
const queueStorage = 2;
const TtlDefaultInSeconds = process.env.TTL_DEFAULT ?? 300;
const SqlHost = process.env.SQL_HOST ?? 'localhost';
const secretKey = process.env.SECRET_KEY ?? 'SECRET_KEY';
const tokenAge = '24h';
const user = process.env.POSTGRES_USER ?? 'postgres';
const pgPassword = process.env.POSTGRES_PASSWORD ?? 123;
const db = process.env.POSTGRES_DB ?? 'node_postgres';
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
  pgPassword,
  user,
  db,
};
