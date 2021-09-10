import Sequelize from 'sequelize';
import {
  dbName, dbUserName, dbPassword, SqlHost,
} from './config.js';

export default function sequelizeClient() {
  const sequelize = new Sequelize(dbName, dbUserName, dbPassword, {
    dialect: 'postgres',
    host: SqlHost,
  });
  sequelize.sync();
  return sequelize;
}
