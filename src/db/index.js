import Sequelize from 'sequelize';
import {
  SqlHost, pgPassword, user, db,
} from '../config.js';

export default function sequelizeReturn() {
  const sequelize = new Sequelize(db, user, pgPassword, {
    dialect: 'postgres',
    host: SqlHost,
  });
  return sequelize;
}
