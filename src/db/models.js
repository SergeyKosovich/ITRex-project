/* eslint-disable max-classes-per-file */
import data from 'sequelize';
import sequelizeReturn from './index.js';

const { Model, DataTypes } = data;
class Patient extends Model {}
class Resolution extends Model {}
class Queue extends Model {}
function sequelizeInit() {
  const sequelize = sequelizeReturn();
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

  Patient.init(
    {
      patient_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
    },
    { sequelize, modelName: 'patients' },
  );
  sequelize.sync();

  Resolution.init(
    {
      patient_id: DataTypes.INTEGER,
      resolution: DataTypes.STRING,
      ttl: DataTypes.BIGINT,
    },
    { sequelize, modelName: 'resolutions' },
  );
  Resolution.belongsTo(Patient, { foreignKey: 'patient_id' });
  Patient.hasOne(Resolution, { foreignKey: 'patient_id' });
  sequelize.sync();
  return sequelize;
}

export {
  Queue, Patient, Resolution, sequelizeInit,
};
