import WebSocket from "ws";
import { secretKey, WS_PORT } from "../config.js";
import {
  queueStorageMethods,
  resolutionsStorageMethods,
} from "../storageClasses/storageFactory.js";
import doctorStorage from "../repositories/doctorStorage.js";
import tokenService from "../token/tokenService.js";
import patientStorage from "../repositories/patientStorage.js";
import ResolutionForUserDto from "../dtos/resolutionForUserDto.js";
import PatientNotFoundError from "../errors/patientNotFoundError.js";
import DoctorNotFoundError from "../errors/doctorNotFoundError.js";

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

      if (!patient) {
        throw new PatientNotFoundError();
      }

      return res.status(200).json(patient);
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
        throw new DoctorNotFoundError();
      }

      await queueStorageMethods.addToque(name, doctor.doctor_id);
      ws.send(JSON.stringify({ name: req.body.name, event: "addUser" }));

      return res.send();
    } catch (error) {
      return next(error);
    }
  };

  getUser = async (req, res, next) => {
    try {
      const userData = await patientStorage.getPatientById(req.user.patient_id);
      if (!userData) {
        throw new PatientNotFoundError();
      }

      const payload = {
        user_id: req.user.user_id,
        patient_id: userData.patient_id,
      };

      const token = tokenService.generate(payload, secretKey);
      userData.token = token;

      return res.json(userData);
    } catch (error) {
      return next(error);
    }
  };

  getResolutions = async (req, res) => {
    const resolutions = await resolutionsStorageMethods.getResolutionInStorage(
      req.user.patient_id
    );

    if (resolutions) {
      const data = resolutions.map(
        (resolution) =>
          new ResolutionForUserDto(req.user.patient_id, resolution)
      );

      res.status(200).json(data);
    } else {
      res.status(404).send("no resolutions");
    }
  };

  getQueue = async (req, res) => {
    const queue = await queueStorageMethods.returnQueue();
    res.status(200).json(queue);
  };
}
