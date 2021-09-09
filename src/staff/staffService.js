import doctorStorage from "../repositories/doctorStorage.js";

export default class StaffService {
  async getDoctor(id) {
    try {
      const doctor = await doctorStorage.getDoctor(id);

      return doctor || null;
    } catch (error) {
      throw new Error(error);
    }
  }
}
