import Sequelize from "sequelize";
import { SqlHost } from "../config.js";

export default function sequelizeReturn() {
  const sequelize = new Sequelize("node_postgres", "postgres", "123", {
    dialect: "postgres",
    host: SqlHost.toString(),
  });
  return sequelize;
}
