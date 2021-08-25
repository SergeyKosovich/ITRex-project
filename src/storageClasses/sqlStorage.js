import asyncRedis from 'async-redis';
import { Patient, Resolution, sequelizeInit } from '../db/models.js';
import { REDIS_PORT } from '../config.js';

export default class SqlStorage {
  constructor() {
    this.init = sequelizeInit();
    this.client = asyncRedis.createClient(REDIS_PORT);
    this.client.on('error', (err) => {
      console.log(`Error ${err}`);
    });
    this.client.FLUSHDB();
    this.queue = this.client;
    this.counter = 0;
  }

  async addToque(data) {
    await this.client.RPUSH('queueForPostgres', data);
  }

  async indexInQueue(patientName) {
    const value = await this.client.lrange('queueForPostgres', 0, -1);
    const arr = Array.from(value);
    return arr.indexOf(`${patientName}`);
  }

  async deleteFromQue(index) {
    const value = await this.client.lrange('queueForPostgres', 0, -1);
    const arr = Array.from(value);
    await this.client.lrem('queueForPostgres', 1, arr[index]);
  }

  async removeFirstPatientInQue() {
    await this.client.LPOP('queueForPostgres');
  }

  async checkFirstPatientInQueue() {
    const [patient] = await this.client.lrange('queueForPostgres', 0, 0);
    return patient;
  }

  async returnQueue() {
    const value = await this.client.lrange('queueForPostgres', 0, -1);
    const arr = Array.from(value);
    return arr;
  }

  async getResolutionInStorage(patientName) {
    const patient = await Patient.findOne({
      attributes: ['patient_id', 'name'],
      where: {
        name: patientName,
      },
    });

    if (patient) {
      const resolutions = await Resolution.findAll({
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
    const patientIsInTable = await Patient.findOne({
      attributes: ['patient_id', 'name'],
      where: {
        name: patientName,
      },
    });
    if (!patientIsInTable) {
      const patient = await Patient.create({
        name: patientName,
      });
      await Resolution.create({
        patient_id: patient.patient_id,
        resolution: previous,
      });
      return;
    }
    if (!resolutions) {
      await Resolution.create({
        patient_id: patientIsInTable.patient_id,
        resolution: previous,
      });
      return;
    }
    await Resolution.create({
      patient_id: patientIsInTable.patient_id,
      resolution: resolutions,
    });
  }

  async deleteResolutionInStorage(patientName) {
    const patient = await Patient.findOne({
      attributes: ['patient_id', 'name'],
      where: {
        name: patientName,
      },
    });
    if (patient) {
      const patientId = patient.patient_id;
      await Resolution.destroy({
        where: {
          patient_id: patientId,
        },
      });
    }
  }
}
