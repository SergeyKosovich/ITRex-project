import WebSocket from 'ws';
import { WS_PORT } from '../config.js';
import Service from './patientService.js';
import currentStorageMethods from '../storageClasses/storageFactory.js';

const service = new Service();

const ws = new WebSocket(`ws://localhost:${WS_PORT}`);

export default class Controller {
  deleteFromQueqe = async (req, res) => {
    await service.removeTopPacient();
    const patient = await currentStorageMethods.checkFirstPatientInQueqe();
    if (patient) {
      return res.status(200).json(patient);
    }
    return res.status(200).json('No patient');
  };

  getName = async (req, res) => {
    const patient = await currentStorageMethods.checkFirstPatientInQueqe();
    if (patient) {
      res.status(200).json(patient);
      return;
    }
    res.status(404).send();
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
