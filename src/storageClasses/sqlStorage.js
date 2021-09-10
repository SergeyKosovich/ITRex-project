/* eslint-disable camelcase */
import {
  Patient, Resolutions, sequelizeInit, Queue,
} from '../db/models.js';

export default class SqlStorage {
  constructor(
    initSeq = sequelizeInit(),
    queue = Queue,
    patient = Patient,
    resolution = Resolutions,
  ) {
    this.init = initSeq;
    this.Patient = patient;
    this.Resolutions = resolution;
    this.Queue = queue;
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

  async getResolutions(patientId) {
    const resolutions = await this.Resolutions.findAll({
      attributes: ['resolution', 'ttl', 'patient_id'],
      where: {
        patient_id: patientId,
      },
    });
    if (!resolutions[0]) {
      return resolutions;
    }
    const allResolutions = [];
    resolutions.forEach(async (resolution) => {
      if (resolution.ttl <= Date.now() && resolution.ttl) {
        await this.Resolutions.destroy({
          where: {
            patient_id: resolution.patient_id,
            ttl: resolution.ttl,
          },
        });
        return;
      }
      allResolutions.push(resolution.resolution);
    });

    return allResolutions;
  }

  async setResolution(data) {
    const { patient_id, ttl, resolution } = data;
    const dataForDb = {
      patient_id,
      resolution,
    };
    if (ttl) {
      dataForDb.ttl = Date.now() + ttl * 1000;
    }
    await this.Resolutions.create(dataForDb);
  }

  async deleteResolution(patientId) {
    await this.Resolutions.destroy({
      where: {
        patient_id: patientId,
      },
    });
  }

  async getPatientData(userId) {
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

  async createNewPatient(
    userId,
    userFirstName,
    userLastName,
    userGender,
    userBirthday,
  ) {
    const patient = await this.Patient.create({
      user_id: userId,
      firstName: userFirstName,
      lastName: userLastName,
      gender: userGender,
      birthday: userBirthday,
    });
    return patient;
  }
}
