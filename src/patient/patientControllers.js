import WebSocket from "ws";
import { secretKey, WS_PORT } from "../config.js";
import { queueStorageMethods } from "../storageClasses/storageFactory.js";
import ApiError from "../errors/appError.js";
import doctorStorage from "../repositories/doctorStorage.js";
import tokenService from "../token/tokenService.js";
import patientStorage from "../repositories/patientStorage.js";
import { NOT_FOUND } from "../constants/statusCodes.js";
import { PATIENT_NOT_FOUND, DOCTOR_NOT_FOUND } from "../constants/messages.js";

const ws = new WebSocket(`ws://localhost:${WS_PORT}`);

export default class Controller {
  deleteFirstAndReturnNewFirstFromQueue = async (req, res, next) => {
    const doctorId = req.user.doctor_id;
    try {
      await queueStorageMethods.removeFirstPatientInQueue(doctorId);
      const patient = await queueStorageMethods.checkFirstPatientInQueue(
        doctorId
      );
      if (patient) {
        return res.status(200).json(patient);
      }
      return res.status(200).json("No patient");
    } catch (error) {
      return next(error);
    }
  };

  getFirstUserInQueue = async (req, res, next) => {
    const doctorId = req.user.doctor_id;

    try {
      const patient = await queueStorageMethods.checkFirstPatientInQueue(
        doctorId
      );
      if (patient) {
        return res.status(200).json(patient);
      }
      throw new ApiError(NOT_FOUND, PATIENT_NOT_FOUND);
    } catch (error) {
      next(error);
    }
  };

  addUser = async (req, res, next) => {
    const { name, specialization } = req.body;

    try {
      const doctor = await doctorStorage.getDoctorBySpecialization(
        specialization
      );

      if (!doctor) {
        throw new ApiError(NOT_FOUND, DOCTOR_NOT_FOUND);
      }

      await queueStorageMethods.addToque(name, doctor.doctor_id);
      ws.send(JSON.stringify({ name: req.body.name, event: "addUser" }));

      return res.send();
    } catch (error) {
      return next(error);
    }
  };

  getUser = async (req, res, next) => {
    const userId = req.user.user_id;
    try {
      const userData = await patientStorage.getPatientByUserId(userId);
      if (!userData) {
        throw new ApiError(NOT_FOUND, PATIENT_NOT_FOUND);
      }

      const token = tokenService.generate(userId, secretKey);
      userData.token = token;

      return res.json(userData);
    } catch (error) {
      return next(error);
    }
  };

  getQueue = async (req, res) => {
    const queue = await queueStorageMethods.returnQueue();
    res.status(200).json(queue);
  };
}
