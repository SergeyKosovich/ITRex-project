import WebSocket from 'ws';
import { WS_PORT } from '../config.js';
import InMemoryStorage from '../storageClasses/localStorage.js';
import ApiError from '../errors/appError.js';

const currentStorageMethods = new InMemoryStorage();

const ws = new WebSocket(`ws://localhost:${WS_PORT}`);

export default class Controller {
  deleteFromQueqe = async (req, res) => {
    await currentStorageMethods.removeFirstPatientInQue();
    const patient = await currentStorageMethods.checkFirstPatientInQueqe();
    if (patient) {
      return res.status(200).json(patient);
    }
    return res.status(200).json('No patient');
  };

  getName = async (req, res, next) => {
    const patient = await currentStorageMethods.checkFirstPatientInQueqe();
    try {
      if (patient) {
        res.status(200).json(patient);
        return;
      }
      throw new ApiError(404, 'No patient found');
    } catch (error) {
      next(error);
    }
  };

  addUser = async (req, res) => {
    await currentStorageMethods.addToque(req.body.name);
    ws.send(JSON.stringify({ name: req.body.name, event: 'addUser' }));
    res.status(200).send();
  };

  getQueue = async (req, res) => {
    const queqe = await currentStorageMethods.returnQueqe();
    if (queqe.length > 0) {
      res.status(200).json(queqe);
      return;
    }
    res.status(200).json([]);
  };
}
