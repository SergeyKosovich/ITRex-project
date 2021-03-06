/* eslint-disable max-classes-per-file */
import data from 'sequelize';
import sequelizeReturn from './index.js';
import { doctors, users, specializations } from './seed.js';

const { Model, DataTypes } = data;
class Resolution extends Model {}
class User extends Model {}
class Patient extends Model {}
class Doctor extends Model {}
class Specialization extends Model {}
class Queue extends Model {}

async function sequelizeInit() {
  const sequelize = await sequelizeReturn();

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
    {
      indexes: [
        {
          unique: true,
          fields: ['email'],
        },
      ],
      sequelize,
      modelName: 'users',
    },
  );

  Patient.init(
    {
      patient_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
      gender: DataTypes.STRING,
      birthday: DataTypes.STRING,
    },
    {
      indexes: [
        {
          fields: ['name'],
        },
        {
          unique: true,
          fields: ['user_id'],
        },
      ],
      sequelize,
      modelName: 'patients',
    },
  );
  User.hasOne(Patient, { foreignKey: 'user_id' });
  Patient.belongsTo(User, { foreignKey: 'user_id' });

  Resolution.init(
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
    {
      indexes: [
        {
          fields: ['patient_id'],
        },
      ],
      sequelize,
      modelName: 'resolutions',
    },
  );
  Resolution.belongsTo(Patient, { foreignKey: 'patient_id' });
  Patient.hasMany(Resolution, { foreignKey: 'patient_id' });

  Doctor.init(
    {
      doctor_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
    },
    {
      indexes: [
        {
          unique: true,
          fields: ['user_id'],
        },
      ],
      sequelize,
      modelName: 'doctors',
    },
  );
  User.hasOne(Doctor, { foreignKey: 'user_id' });
  Doctor.belongsTo(User, { foreignKey: 'user_id' });
  Resolution.belongsTo(Doctor, { foreignKey: 'doctor_id' });
  Doctor.hasMany(Resolution, { foreignKey: 'doctor_id' });

  Specialization.init(
    {
      specialization_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
    },
    {
      indexes: [
        {
          unique: true,
          fields: ['name'],
        },
      ],
      sequelize,
      modelName: 'specializations',
    },
  );
  Specialization.belongsToMany(Doctor, {
    through: 'doctor_specialization',
    foreignKey: 'specialization_id',
  });
  Doctor.belongsToMany(Specialization, {
    through: 'doctor_specialization',
    foreignKey: 'doctor_id',
  });

  // First run :npm run lint
  await sequelize.sync({ force: true });

  const savedSpecs = await Specialization.bulkCreate(specializations);
  const savedUsers = await User.bulkCreate(users);

  doctors.forEach(async (doctor, i) => {
    const savedDoctor = await Doctor.create({
      name: doctor.name,
      user_id: savedUsers[i].user_id,
    });
    savedDoctor.addSpecialization(savedSpecs[i].specialization_id);
  });
  //  First run
  return sequelize;
}

sequelizeInit().then();

export {
  Patient,
  Resolution,
  User,
  sequelizeInit,
  Queue,
  Doctor,
  Specialization,
};
