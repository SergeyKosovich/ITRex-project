import { secretKey } from "../config.js";
import PatientStorage from "../repositories/patientStorage.js";
import StaffService from "../staff/staffService.js";
import tokenService from "../token/tokenService.js";
import AuthService from "./authService.js";

const staffService = new StaffService();
export default class Controller {
  constructor() {
    this.authService = new AuthService();
    this.patientStorage = new PatientStorage();
  }

  authUser = async (req, res, next) => {
    try {
      const response = await this.authService.checkCredentials(req.body);

      const userData = await this.patientStorage.getPatient(response.user_id);
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

      const token = tokenService.generate(user.user_id, secretKey);

      const doctorData = await staffService.getDoctor(user.user_id);
      doctorData.token = token;
      console.log(doctorData);
      return res.json(doctorData);
    } catch (error) {
      return next(error);
    }
  };
}
