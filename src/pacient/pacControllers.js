import ApiError from '../errors/appError.js';
import { queqe } from '../storage.js';

const wsPort = 8080;
export const port = { wsPort };

export default class Controller {
  checkName(req, res, next) {
    if (!req.body.name) {
      throw new ApiError(400);
    }
    next();
  }

  checkQueqe(q = queqe) {
    return (req, res) => {
      if (q[0]) {
        return res.status(200).send(JSON.stringify(q[0]));
      }
      return res.status(204).send('No patient');
    };
  }

  getName(q = queqe) {
    return (req, res) => {
      if (q[0]) {
        res.status(200).send(JSON.stringify(q[0]));
        return;
      }
      res.status(204).send('No patient');
    };
  }

  addToStorage(req, res) {
    res.status(200).send('success');
  }
}
