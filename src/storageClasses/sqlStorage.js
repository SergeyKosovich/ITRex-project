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

  async getResolutionInStorage(patientName) {
    const resolutions = await Resolution.findAll({
      include: [
        {
          model: Patient,
          where: { name: patientName },
        },
      ],
    });
    const allResolutions = [];
    resolutions.forEach(async (resolution) => {
      if (resolution.ttl <= Date.now()) {
        await this.Resolution.destroy({
          where: {
            patient_id: resolution.patient_id,
            ttl: resolution.ttl,
          },
        });
        return;
      }
      allResolutions.push(resolution.resolution);
    });
    return allResolutions.join(' ');
  }

  async setResolutionInStorage(data) {
    const { name, ttl, resolution } = data;
    const ttlWithCurrentTime = Date.now() + ttl * 1000;
    const patientIsInTable = await this.Patient.findOne({
      attributes: ['patient_id', 'name'],
      where: {
        name,
      },
    });
    if (!patientIsInTable) {
      const patient = await this.Patient.create({
        name,
      });
      await this.Resolution.create({
        patient_id: patient.patient_id,
        resolution,
        ttl: ttlWithCurrentTime,
      });
      return;
    }
    await this.Resolution.create({
      patient_id: patientIsInTable.patient_id,
      resolution,
      ttl: ttlWithCurrentTime,
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
