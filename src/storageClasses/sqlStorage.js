/* eslint-disable camelcase */
import {
  Patient, Resolution, User, sequelizeInit, Queue,
} from '../db/models.js';

export default class SqlStorage {
  constructor(
    initSeq = sequelizeInit(),
    queue = Queue,
    patient = Patient,
    resolution = Resolution,
    user = User,
  ) {
    this.init = initSeq;
    this.Patient = patient;
    this.Resolution = resolution;
    this.Queue = queue;
    this.User = user;
  }

  async addToque(data) {
    await this.Queue.create({
      name: data,
    });
  }

  async indexInQueue(patientName) {
    const res = await this.Queue.findOne({
      attributes: ['que_id', 'name'],
      where: {
        name: patientName,
      },
    });
    if (!res) {
      return -1;
    }

    return res.que_id - 1;
  }

  async deleteFromQueue(index) {
    await this.Queue.destroy({
      where: {
        que_id: index + 1,
      },
    });
  }

  async removeFirstPatientInQueue() {
    await this.Queue.destroy({
      order: [['que_id', 'ASC']],
      attributes: ['que_id', 'name'],
      limit: 1,
      where: {},
    });
  }

  async checkFirstPatientInQueue() {
    const user = await this.Queue.findOne({
      order: [['que_id', 'ASC']],
      attributes: ['que_id', 'name'],
    });
    if (user) {
      return user.name;
    }
    return null;
  }

  async returnQueue() {
    const usersArr = await this.Queue.findAll({
      order: [['que_id', 'ASC']],
      attributes: ['name'],
    });
    if (usersArr) {
      return usersArr.map((user) => user.name);
    }
    return [];
  }

  async getResolutionInStorage(patientId) {
    const resolutions = await this.Resolution.findAll({
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

  async setResolutionInStorage(data) {
    const { patient_id, ttl, resolution } = data;
    const dataForDb = {
      patient_id,
      resolution,
    };
    if (ttl) {
      dataForDb.ttl = Date.now() + ttl * 1000;
    }
    await this.Resolution.create(dataForDb);
  }

  async deleteResolutionInStorage(patientId) {
    await this.Resolution.destroy({
      where: {
        patient_id: patientId,
      },
    });
  }

  async checkUserAndPassInDb(emailToCheck) {
    const user = await this.User.findOne({
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

  async getUserData(userId) {
    const user = await this.Patient.findOne({
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

  async createNewUserAndPatient(
    userMail,
    userPass,
    userFirstName,
    userLastName,
    userGender,
    userBirthday,
  ) {
    const response = await this.User.create({
      email: userMail,
      password: userPass,
    });
    const patient = await this.Patient.create({
      user_id: response.user_id,
      firstName: userFirstName,
      lastName: userLastName,
      gender: userGender,
      birthday: userBirthday,
    });
    return patient.patient_id;
  }
}
