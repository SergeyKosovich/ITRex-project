import WebSocket from "ws";
import { WS_PORT } from "../config.js";
import { queueStorageMethods } from "../storageClasses/storageFactory.js";
import ApiError from "../errors/appError.js";
import doctorStorage from "../repositories/doctorStorage.js";

const ws = new WebSocket(`ws://localhost:${WS_PORT}`);

export default class Controller {
  deleteFirstAndReturnNewFirstFromQueue = async (req, res) => {
    const doctorId = req.user.doctor_id;
    // TODO check doctorId=====================================================

    await queueStorageMethods.removeFirstPatientInQueue(doctorId);
    const patient = await queueStorageMethods.checkFirstPatientInQueue(
      doctorId
    );
    if (patient) {
      return res.status(200).json(patient);
    }
    return res.status(200).json("No patient");
  };

  getFirstUserInQueue = async (req, res, next) => {
    const doctorId = req.user.doctor_id;
    // TODO check doctorId=====================================================

    const patient = await queueStorageMethods.checkFirstPatientInQueue(
      doctorId
    );
    try {
      if (patient) {
        res.status(200).json(patient);
        return;
      }
      throw new ApiError(404, "No patient found");
    } catch (error) {
      next(error);
    }
  };

  addUser = async (req, res) => {
    const { name, specialization } = req.body;

    const [doctor] = await doctorStorage.getDoctorBySpecialization(
      specialization
    );
    // TODO check doctor?=====================================================

    await queueStorageMethods.addToque(name, doctor.doctor_id);
    ws.send(JSON.stringify({ name: req.body.name, event: "addUser" }));
    res.status(200).send();
  };

  getQueue = async (req, res) => {
    const queue = await queueStorageMethods.returnQueue();
    res.status(200).json(queue);
  };
}
