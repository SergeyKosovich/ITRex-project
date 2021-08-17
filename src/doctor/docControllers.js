import ApiError from '../errors/appError.js';
import { dataStorage } from '../storage.js';

export default class Controller {
  constructor() {
    this.dataStorage = dataStorage;
  }

  checkPatIsExist() {
    return (req, res, next) => {
      if (!this.dataStorage.has(req.body.name)) {
        throw new ApiError(404, `No matches by name: ${req.body.name}`);
      }
      next();
    };
  }

  sendName() {
    return (req, res) => {
      if (this.dataStorage.has(req.query.name)) {
        res.status(200).json(this.dataStorage.get(req.query.name));
      } else {
        res.status(204).send();
      }
    };
  }

  addToStorage(req, res) {
    res.status(200).send();
  }
}
