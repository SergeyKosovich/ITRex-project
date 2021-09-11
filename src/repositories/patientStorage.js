import { Patient } from "../db/models.js";

class PatientStorage {
  async getPatientByUserId(userId) {
    const patient = await Patient.findOne({
      where: {
        user_id: userId,
      },
      attributes: ["firstName", "lastName", "patient_id", "gender", "birthday"],
      raw: true,
    });

    return patient || null;
  }

  async getPatientByName(firstName) {
    const patient = await Patient.findOne({
      where: { firstName },
      attributes: ["firstName", "lastName", "patient_id", "gender", "birthday"],
      raw: true,
    });

    return patient || null;
  }
}

export default new PatientStorage();
