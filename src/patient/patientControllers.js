import WebSocket from 'ws';
import { WS_PORT } from '../config.js';
import { queueStorageMethods } from '../storageClasses/storageFactory.js';
import ApiError from '../errors/appError.js';

const ws = new WebSocket(`ws://localhost:${WS_PORT}`);

export default class Controller {
  deleteFirstAndReturnNewFirstFromQueue = async (req, res) => {
    await queueStorageMethods.removeFirstPatientInQue();
    const patient = await queueStorageMethods.checkFirstPatientInQueue();
    if (patient) {
      return res.status(200).json(patient);
    }
    return res.status(200).json('No patient');
  };

  getName = async (req, res, next) => {
    const patient = await queueStorageMethods.checkFirstPatientInQueue();
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
    await queueStorageMethods.addToque(req.body.name);
    ws.send(JSON.stringify({ name: req.body.name, event: 'addUser' }));
    res.status(200).send();
  };

  getQueue = async (req, res) => {
    const queue = await queueStorageMethods.returnQueue();  
    res.status(200).json(queue);  
  };
}
