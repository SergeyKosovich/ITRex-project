import doctorStorage from "../repositories/doctorStorage.js";
import { DOCTOR_NOT_FOUND } from "../constants/messages.js";
import { NOT_FOUND } from "../constants/statusCodes.js";
import ApiError from "../errors/appError.js";

class StaffController {
  getDoctor = async (req, res, next) => {
    try {
      const doctor = await doctorStorage.getDoctorById(req.params.doctorId);

      if (!doctor) {
        throw new ApiError(NOT_FOUND, DOCTOR_NOT_FOUND);
      }

      return res.json(doctor);
    } catch (error) {
      return next(error);
    }
  };
}

export default new StaffController();
