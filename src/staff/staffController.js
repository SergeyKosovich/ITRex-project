import StaffService from "./staffService.js";

class StaffController {
  constructor() {
    this.staffService = new StaffService();
  }

  getDoctor = async (req, res, next) => {
    try {
      const doctor = await this.staffService.getDoctor(req.params.doctorId);

      return doctor
        ? res.json(doctor)
        : res.status(404).json({ message: "Doctor not found" });
    } catch (error) {
      return next(error);
    }
  };
}

export default new StaffController();
