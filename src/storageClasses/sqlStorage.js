import {
  Queque, Patient, Resolution, sequelizeInit,
} from '../db/models.js';

export default class SqlStorage {
  constructor() {
    this.init = sequelizeInit();
  }

  async addToque(data) {
    await Queque.create({
      name: data,
    });
  }

  async indexInQueqe(patientName) {
    const res = await Queque.findOne({
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
    await Queque.destroy({
      where: {
        que_id: index + 1,
      },
    });
  }

  async removeFirstPatientInQue() {
    const user = await Queque.findOne({
      order: [['que_id', 'ASC']],
      attributes: ['que_id', 'name'],
    });
    if (user) {
      await Queque.destroy({
        where: {
          name: user.name,
        },
      });
    }
  }

  async checkFirstPatientInQueqe() {
    const user = await Queque.findOne({
      order: [['que_id', 'ASC']],
      attributes: ['que_id', 'name'],
    });
    if (user) {
      return user.name;
    }
    await Queque.truncate({ restartIdentity: true });
    return null;
  }

  async returnQueqe() {
    const usersArr = await Queque.findAll({
      order: [['que_id', 'ASC']],
      attributes: ['name'],
    });
    if (usersArr) {
      return usersArr.map((user) => user.name);
    }
    return [];
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

  async deleteResolutionInstorage(patientName) {
    const patient = await Patient.findOne({
      attributes: ['patient_id', 'name'],
      where: {
        name: patientName,
      },
    });
    if (patient) {
      const patienId = patient.patient_id;
      await Resolution.destroy({
        where: {
          patient_id: patienId,
        },
      });
    }
  }
}
