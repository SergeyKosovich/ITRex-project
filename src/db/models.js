/* eslint-disable max-classes-per-file */
import data from 'sequelize';
import sequelizeReturn from './index.js';

const { Model, DataTypes } = data;
class Resolution extends Model {}
class User extends Model {}
class Patient extends Model {}

function sequelizeInit() {
  const sequelize = sequelizeReturn();

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

  Resolution.init(
    {
      patient_id: DataTypes.INTEGER,
      resolution: DataTypes.STRING,
    },
    { sequelize, modelName: 'resolutions' },
  );
  Resolution.belongsTo(Patient, { foreignKey: 'patient_id' });
  Patient.hasMany(Resolution, { foreignKey: 'patient_id' });
  sequelize.sync();
  return sequelize;
}

export {
  Patient, Resolution, User, sequelizeInit,
};
