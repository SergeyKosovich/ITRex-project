import {
  Patient, Resolution, User, sequelizeInit,
} from '../db/models.js';

export default class SqlStorage {
  constructor(
    initSeq = sequelizeInit(),
    patient = Patient,
    resolution = Resolution,
  ) {
    this.init = initSeq;
    this.Patient = patient;
    this.Resolution = resolution;
  }

  async getResolutionInStorage(patientId) {
    const resolutions = await Resolution.findAll({
      attributes: ['resolution'],
      where: {
        patient_id: patientId,
      },
    });
    if (!resolutions[0]) {
      return null;
    }
    return resolutions;
  }

  async setResolutionInStorage(patientId, previous) {
    await Resolution.create({
      patient_id: patientId,
      resolution: previous,
    });
  }

  async deleteResolutionInStorage(patientId) {
    await Resolution.destroy({
      where: {
        patient_id: patientId,
      },
    });
  }

  async checkUserAndPassInDb(emailToCheck) {
    const user = await User.findOne({
      attributes: ['email', 'password', 'user_id'],
      where: {
        email: emailToCheck,
      },
    });
    if (user) {
      return user;
    }
    return null;
  }

  async checkUserInDb(emailToCheck) {
    const user = await User.findOne({
      attributes: ['email'],
      where: {
        email: emailToCheck,
      },
    });
    if (user) {
      return 1;
    }
    return null;
  }

  async getUserData(userId) {
    const user = await Patient.findOne({
      attributes: ['firstName', 'lastName', 'patient_id'],
      where: {
        user_id: userId,
      },
    });
    if (user) {
      return user;
    }
    return null;
  }

  async createNewUser(
    userMail,
    userPass,
    userFirstName,
    userLastName,
    userGender,
    userBirthday,
  ) {
    const response = await User.create({
      email: userMail,
      password: userPass,
    });

    const patient = await Patient.create({
      user_id: response.user_id,
      firstName: userFirstName,
      lastName: userLastName,
      gender: userGender,
      birthday: userBirthday,
    });
    return patient.patient_id;
  }
}
