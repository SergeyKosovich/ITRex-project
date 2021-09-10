/* eslint-disable max-classes-per-file */
import data from 'sequelize';
import sequelizeClient from './index.js';

const { Model, DataTypes } = data;
class Resolutions extends Model {}
class User extends Model {}
class Patient extends Model {}
class Queue extends Model {}

function sequelizeInit() {
  const sequelize = sequelizeClient();

  Queue.init(
    {
      que_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
    },
    { sequelize, modelName: 'queues' },
  );
  sequelize.sync();

  User.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    { sequelize, modelName: 'users' },
  );
  sequelize.sync();

  Patient.init(
    {
      patient_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      gender: DataTypes.STRING,
      birthday: DataTypes.STRING,
    },
    { sequelize, modelName: 'patients' },
  );
  User.hasOne(Patient, { foreignKey: 'user_id' });
  Patient.belongsTo(User, { foreignKey: 'user_id' });

  sequelize.sync();

  Resolutions.init(
    {
      resolution_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      patient_id: DataTypes.INTEGER,
      resolution: DataTypes.STRING,
      ttl: DataTypes.BIGINT,
    },
    { sequelize, modelName: 'resolutions' },
  );
  Resolutions.belongsTo(Patient, { foreignKey: 'patient_id' });
  Patient.hasMany(Resolutions, { foreignKey: 'patient_id' });
  sequelize.sync();
  return sequelize;
}

export {
  Patient, Resolutions, User, sequelizeInit, Queue,
};
