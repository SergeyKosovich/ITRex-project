import { Doctor, Specialization } from "../db/models.js";

export default class StaffService {
  async getDoctor(id) {
    try {
      return (
        await Doctor.findOne({
          where: { user_id: id },
          include: {
            model: Specialization,
            attributes: ["name"],
            through: { attributes: [] },
          },
        })
      )?.get({ plain: true });
    } catch (error) {
      throw new Error(error);
    }
  }
}
