/* eslint-disable import/extensions */
import ApiError from '../errors/appError.js';
import { queqe } from '../consts.js';
import Service from './pacService.js';

const service = new Service();

export default class Controller {
  checkBody(req, res, next) {
    if (!req.body.name) {
      throw new ApiError(400);
    }
    next();
  }

  checkQueqe(req, res, next, q = queqe) {
    if (q[0]) {
      return res.status(200).send(JSON.stringify(q[0]));
    }
    return res.status(200).send(JSON.stringify('No patient'));
  }

  sendName(req, res, next, q = queqe) {
    res.status(200).send(JSON.stringify(q[0]));
  }

  forTtl(req, res) {
    if (req.body.ttl) {
      setTimeout(() => {
        service.removeAfterTtl(req.body.name);
      }, req.body.ttl * 1000);
    }
    res.status(200).send(JSON.stringify('success'));
  }
}
