import DoctorNotFoundError from '../errors/doctorNotFoundError.js';
import PatientNotFoundError from '../errors/patientNotFoundError.js';
import { secretKey } from '../config.js';
import doctorStorage from '../repositories/doctorStorage.js';
import patientStorage from '../repositories/patientStorage.js';
import tokenService from '../token/tokenService.js';
import AuthService from './authService.js';

export default class Controller {
  constructor() {
    this.authService = new AuthService();
  }

  authUser = async (req, res, next) => {
    try {
      const user = await this.authService.checkCredentials(req.body);
      const userData = await patientStorage.getPatientByUserId(user.user_id);

      if (!userData) {
        throw new PatientNotFoundError();
      }

      const payload = {
        user_id: user.user_id,
        patient_id: userData.patient_id,
      };

      const token = tokenService.generate(payload, secretKey);
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
        throw new DoctorNotFoundError();
      }

      const token = tokenService.generateForStaff(doctor, secretKey);
      doctor.token = token;

      return res.json(doctor);
    } catch (error) {
      return next(error);
    }
  };
}
