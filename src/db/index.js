import Sequelize from 'sequelize';
import { PostgresHost } from '../config.js';

export default function sequelizeReturn() {
  const sequelize = new Sequelize('node_postgres', 'postgres', '123', {
    dialect: 'postgres',
    host: PostgresHost.toString(),
  });
  sequelize.sync();
  return sequelize;
}
