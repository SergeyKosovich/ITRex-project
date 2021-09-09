import { Doctor, Specialization } from "../db/models.js";

class DoctorStorage {
  async getDoctor(id) {
    return (
      await Doctor.findByPk(id, {
        include: {
          model: Specialization,
          attributes: ["name"],
          through: { attributes: [] },
        },
      })
    )?.get({ plain: true });
  }

  async getDoctorByUserId(userId) {
    return (
      await Doctor.findOne({
        where: { user_id: userId },
        include: {
          model: Specialization,
          attributes: ["name"],
          through: { attributes: [] },
        },
      })
    )?.get({ plain: true });
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

    return data ? data.doctors : null;
  }
}

export default new DoctorStorage();
