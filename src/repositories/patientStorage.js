import Sequelize from "sequelize";
import { Patient } from "../db/models.js";

const { Op } = Sequelize;
class PatientStorage {
  async getPatientByUserId(userId) {
    const patient = await Patient.findOne({
      where: {
        user_id: userId,
      },
      attributes: ["name", "patient_id", "gender", "birthday"],
      raw: true,
    });

    return patient || null;
  }

  async getPatientById(id) {
    const patient = await Patient.findByPk(id, {
      attributes: ["name", "patient_id", "gender", "birthday"],
      raw: true,
    });

    return patient || null;
  }

  async getPatientByName(name) {
    return Patient.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%`,
        },
      },
      attributes: ["name", "patient_id", "gender", "birthday"],
      raw: true,
    });
  }
}

export default new PatientStorage();
