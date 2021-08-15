import ApiError from '../errors/appError.js';
import { dataStorage } from '../storage.js';

export default class Controller {
  checkPatIsExist(m = dataStorage) {
    return (req, res, next) => {
      if (!m.has(req.body.name)) {
        throw new ApiError(404, `No matches by name: ${req.body.name}`);
      }
      next();
    };
  }

  sendName(m = dataStorage) {
    return (req, res) => {
      if (m.has(req.query.name)) {
        res.status(200).send(JSON.stringify(m.get(req.query.name)));
      } else {
        res.status(204).send('no matches by this name');
      }
    };
  }

  addToStorage(req, res) {
    res.status(200).send('success');
  }
}
