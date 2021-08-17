import { dataStorage } from '../storage.js';

export default class Service {
  constructor() {
    this.dataStorage = dataStorage;
  }

  setResolution() {
    return (req, res, next) => {
      if (this.dataStorage.has(req.body.name)) {
        let previous = this.dataStorage.get(req.body.name);
        previous += req.body.resolution;
        this.dataStorage.set(req.body.name, previous);
        return next();
      }
      this.dataStorage.set(req.body.name, req.body.resolution);
      next();
    };
  }

  deleteRes() {
    return (req, res, next) => {
      this.dataStorage.delete(req.body.name);
      next();
    };
  }
}
