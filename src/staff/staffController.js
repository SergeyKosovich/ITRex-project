import doctorStorage from "../repositories/doctorStorage.js";
import DoctorNotFoundError from "../errors/doctorNotFoundError.js";

class StaffController {
  getDoctor = async (req, res, next) => {
    try {
      const doctor = await doctorStorage.getDoctorById(req.params.doctorId);

      if (!doctor) {
        throw new DoctorNotFoundError();
      }

      return res.json(doctor);
    } catch (error) {
      return next(error);
    }
  };
}

export default new StaffController();
