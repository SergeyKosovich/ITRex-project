import { Patient } from "../db/models.js";

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
    console.log(name);
    const patient = await Patient.findOne({
      where: { name },
      attributes: ["name", "patient_id", "gender", "birthday"],
      raw: true,
    });

    return patient || null;
  }
}

export default new PatientStorage();
