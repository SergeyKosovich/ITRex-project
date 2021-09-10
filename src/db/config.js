import dotenv from 'dotenv';

dotenv.config();
const dbName = process.env.POSTGRES_DB ?? 'node_postgres';
const dbUserName = process.env.POSTGRES_USER ?? 'postgres';
const dbPassword = process.env.POSTGRES_PASSWORD ?? '123';
const SqlHost = process.env.POSTGRESQL_HOST ?? 'localhost';
export {
  dbName, dbUserName, dbPassword, SqlHost,
};
