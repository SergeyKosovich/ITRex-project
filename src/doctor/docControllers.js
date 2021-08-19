/* eslint prefer-destructuring: ["error", {AssignmentExpression: {object: true}}] */
import { dataStorage } from '../storage.js';
import Service from './docService.js';

const service = new Service();

export default class Controller {
  constructor() {
    this.dataStorage = dataStorage;
  }

  getbyName = (req, res) => {
    if (this.dataStorage.has(req.query.name)) {
      res.status(200).json(this.dataStorage.get(req.query.name));
    } else {
      res.status(204).send();
    }
  };

  patchResolution = async (req, res) => {
    const name = req.body.name;
    const resolution = req.body.resolution;
    await service.setResolution(name, resolution);
    res.status(200).send();
  };

  deleteRes = async (req, res) => {
    if (!this.dataStorage.has(req.body.name)) {
      res.status(404).send();
    }
    this.dataStorage.delete(req.body.name);
    res.status(200).send();
  };
}
