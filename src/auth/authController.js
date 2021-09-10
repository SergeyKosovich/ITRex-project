import { secretKey } from "../config.js";
import { NOT_FOUND } from "../constants/statusCodes.js";
import ApiError from "../errors/appError.js";
import doctorStorage from "../repositories/doctorStorage.js";
import patientStorage from "../repositories/patientStorage.js";
import tokenService from "../token/tokenService.js";
import AuthService from "./authService.js";
import { PATIENT_NOT_FOUND, DOCTOR_NOT_FOUND } from "../constants/messages.js";

export default class Controller {
  constructor() {
    this.authService = new AuthService();
  }

  authUser = async (req, res, next) => {
    try {
      const user = await this.authService.checkCredentials(req.body);
      const userData = await patientStorage.getPatientByUserId(user.user_id);

      if (!userData) {
        throw new ApiError(NOT_FOUND, PATIENT_NOT_FOUND);
      }

      const token = tokenService.generate(user.user_id, secretKey);
      userData.token = token;

      res.status(200).json(userData);
    } catch (error) {
      return next(error);
    }
  };

  authDoctor = async (req, res, next) => {
    try {
      const user = await this.authService.checkCredentials(req.body);
      const doctor = await doctorStorage.getDoctorByUserId(user.user_id);

      if (!doctor) {
        throw new ApiError(NOT_FOUND, DOCTOR_NOT_FOUND);
      }

      const token = tokenService.generateForStaff({ ...doctor }, secretKey);
      doctor.token = token;

      return res.json(doctor);
    } catch (error) {
      return next(error);
    }
  };
}
