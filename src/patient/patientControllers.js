import WebSocket from 'ws';
import { WS_PORT } from '../config.js';
import {
  queueStorageMethods,
  resolutionsStorageMethods,
} from '../storageClasses/storageFactory.js';
import ApiError from '../errors/appError.js';

const ws = new WebSocket(`ws://localhost:${WS_PORT}`);

export default class Controller {
  deleteFirstFromQueue = async (req, res, next) => {
    try {
      await queueStorageMethods.removeFirstPatientInQueue();
      return res.status(200).json();
    } catch (error) {
      next(error);
    }
  };

  getFirstUserInQueue = async (req, res, next) => {
    const patient = await queueStorageMethods.checkFirstPatientInQueue();

    try {
      if (patient) {
        const data = await resolutionsStorageMethods.getPatientData(patient);
        res.status(200).json(data);
        return;
      }
      throw new ApiError(404, 'No patient found');
    } catch (error) {
      next(error);
    }
  };

  addUser = async (req, res, next) => {
    try {
      await queueStorageMethods.addToque(req.user.userId);
      ws.send(JSON.stringify({ name: req.user.userId, event: 'addUser' }));
      res.status(200).send();
    } catch (error) {
      next(error);
    }
  };

  getQueue = async (req, res, next) => {
    try {
      const queue = await queueStorageMethods.returnQueue();
      res.status(200).json(queue);
    } catch (error) {
      next(error);
    }
  };
}
