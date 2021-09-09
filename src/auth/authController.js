import { secretKey } from "../config.js";
import doctorStorage from "../repositories/doctorStorage.js";
import patientStorage from "../repositories/patientStorage.js";
import tokenService from "../token/tokenService.js";
import AuthService from "./authService.js";

export default class Controller {
  constructor() {
    this.authService = new AuthService();
  }

  authUser = async (req, res, next) => {
    try {
      const response = await this.authService.checkCredentials(req.body);

      const userData = await patientStorage.getPatient(response.user_id);
      const token = tokenService.generate(response.user_id, secretKey);
      userData.dataValues.token = token;

      res.status(200).json(userData);
    } catch (error) {
      return next(error);
    }
  };

  authDoctor = async (req, res, next) => {
    try {
      const user = await this.authService.checkCredentials(req.body);
      const doctor = await doctorStorage.getDoctorByUserId(user.user_id);

      const token = tokenService.generateForStaff(
        { userId: user.user_id, ...doctor },
        secretKey
      );

      doctor.token = token;
      return res.json(doctor);
    } catch (error) {
      return next(error);
    }
  };
}
