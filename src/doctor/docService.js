import { dataStorage } from '../storage.js';

export default class Service {
  constructor() {
    this.dataStorage = dataStorage;
  }

  setResolution() {
    return (req, res) => {
      if (this.dataStorage.has(req.body.name)) {
        let previous = this.dataStorage.get(req.body.name);
        previous += req.body.resolution;
        this.dataStorage.set(req.body.name, previous);
        res.status(200).send();
        return;
      }
      this.dataStorage.set(req.body.name, req.body.resolution);
      res.status(200).send();
    };
  }

  deleteRes() {
    return (req, res) => {
      this.dataStorage.delete(req.body.name);
      res.status(200).send();
    };
  }
}
