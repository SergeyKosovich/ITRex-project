import {
  Queue, Patient, Resolution, sequelizeInit,
} from '../db/models.js';

export default class SqlStorage {
  constructor(
    initSeq = sequelizeInit(),
    queue = Queue,
    patient = Patient,
    resolution = Resolution,
  ) {
    this.init = initSeq;
    this.Queue = queue;
    this.Patient = patient;
    this.Resolution = resolution;
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

  async deleteFromQue(index) {
    await this.Queue.destroy({
      where: {
        que_id: index + 1,
      },
    });
  }

  async removeFirstPatientInQue() {
    const user = await this.Queue.findOne({
      order: [['que_id', 'ASC']],
      attributes: ['que_id', 'name'],
    });
    if (user) {
      await this.Queue.destroy({
        where: {
          name: user.name,
        },
      });
    }
  }

  async checkFirstPatientInQueue() {
    const user = await this.Queue.findOne({
      order: [['que_id', 'ASC']],
      attributes: ['que_id', 'name'],
    });
    if (user) {
      return user.name;
    }
    await this.Queue.truncate({ restartIdentity: true });
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

  async getResolutionInStorage(patientName) {
    const patient = await this.Patient.findOne({
      attributes: ['patient_id', 'name'],
      where: {
        name: patientName,
      },
    });

    if (patient) {
      const resolutions = await this.Resolution.findAll({
        attributes: ['resolution'],
        where: {
          patient_id: patient.patient_id,
        },
      });
      return resolutions.map((resolution) => resolution.resolution).join(' ');
    }
    return null;
  }

  async setResolutionInStorage(patientName, previous, resolutions) {
    const patientIsInTable = await this.Patient.findOne({
      attributes: ['patient_id', 'name'],
      where: {
        name: patientName,
      },
    });
    if (!patientIsInTable) {
      const patient = await this.Patient.create({
        name: patientName,
      });
      await this.Resolution.create({
        patient_id: patient.patient_id,
        resolution: previous,
      });
      return;
    }
    if (!resolutions) {
      await this.Resolution.create({
        patient_id: patientIsInTable.patient_id,
        resolution: previous,
      });
      return;
    }
    await this.Resolution.create({
      patient_id: patientIsInTable.patient_id,
      resolution: resolutions,
    });
  }

  async deleteResolutionInStorage(patientName) {
    const patient = await this.Patient.findOne({
      attributes: ['patient_id', 'name'],
      where: {
        name: patientName,
      },
    });
    if (patient) {
      const patientId = patient.patient_id;
      await this.Resolution.destroy({
        where: {
          patient_id: patientId,
        },
      });
    }
  }
}
