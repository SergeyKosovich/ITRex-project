import { Patient } from "../db/models.js";

class PatientStorage {
  async getPatientByUserId(userId) {
    const patient = (
      await Patient.findOne({
        attributes: ["firstName", "lastName", "patient_id"],
        where: {
          user_id: userId,
        },
      })
    )?.get({ plain: true });

    return patient || null;
  }
}

export default new PatientStorage();
