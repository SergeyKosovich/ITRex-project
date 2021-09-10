import { Doctor, Specialization } from "../db/models.js";

class DoctorStorage {
  async getDoctorById(id) {
    const doctor = (
      await Doctor.findByPk(id, {
        include: {
          model: Specialization,
          attributes: ["name"],
          through: { attributes: [] },
        },
      })
    )?.get({ plain: true });

    return doctor || null;
  }

  async getDoctorByUserId(userId) {
    const doctor = (
      await Doctor.findOne({
        where: { user_id: userId },
        include: {
          model: Specialization,
          attributes: ["name"],
          through: { attributes: [] },
        },
      })
    )?.get({ plain: true });

    return doctor || null;
  }

  async getDoctorBySpecialization(specialization) {
    const data = (
      await Specialization.findOne({
        where: {
          name: specialization,
        },
        include: {
          model: Doctor,
          through: { attributes: [] },
        },
      })
    )?.get({ plain: true });

    return data ? data.doctors[0] : null;
  }
}

export default new DoctorStorage();
