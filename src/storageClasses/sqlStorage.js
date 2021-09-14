/* eslint-disable camelcase */
import { Patient, Resolution, User, Queue } from "../db/models.js";

export default class SqlStorage {
  constructor() {
    this.Patient = Patient;
    this.Resolution = Resolution;
    this.Queue = Queue;
    this.User = User;
  }

  async addToque(data) {
    await this.Queue.create({
      name: data,
    });
  }

  async indexInQueue(patientName) {
    const res = await this.Queue.findOne({
      attributes: ["que_id", "name"],
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
      order: [["que_id", "ASC"]],
      attributes: ["que_id", "name"],
      limit: 1,
      where: {},
    });
  }

  async checkFirstPatientInQueue() {
    const user = await this.Queue.findOne({
      order: [["que_id", "ASC"]],
      attributes: ["que_id", "name"],
    });
    if (user) {
      return user.name;
    }
    return null;
  }

  async returnQueue() {
    const usersArr = await this.Queue.findAll({
      order: [["que_id", "ASC"]],
      attributes: ["name"],
    });
    if (usersArr) {
      return usersArr.map((user) => user.name);
    }
    return [];
  }

  async getResolutionInStorage(patientId) {
    const resolutions = await this.Resolution.findAll({
      where: { patient_id: patientId },
      attributes: ["resolution_id", "resolution", "createdAt"],
      include: ["doctor"],
      raw: true,
    });

    return resolutions.length ? resolutions : null;
  }

  async setResolutionInStorage(data) {
    const { patient_id, ttl, resolution, doctor_id } = data;
    const dataForDb = {
      patient_id,
      doctor_id,
      resolution,
    };
    if (ttl) {
      dataForDb.ttl = Date.now() + ttl * 1000;
    }
    await this.Resolution.create(dataForDb);
  }

  async deleteResolutionInStorage(patientId, doctorId) {
    return this.Resolution.destroy({
      where: {
        patient_id: patientId,
        doctor_id: doctorId,
      },
    });
  }

  async checkUserAndPassInDb(emailToCheck) {
    const user = await this.User.findOne({
      attributes: ["email", "password", "user_id"],
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
      attributes: ["name", "patient_id"],
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
    userName,
    userGender,
    userBirthday
  ) {
    const response = await this.User.create({
      email: userMail,
      password: userPass,
    });
    const patient = await this.Patient.create({
      user_id: response.user_id,
      name: userName,
      gender: userGender,
      birthday: userBirthday,
    });
    return patient.patient_id;
  }
}
