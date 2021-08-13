/* eslint-disable import/extensions */
import ApiError from '../errors/appError.js';
import { map } from '../consts.js';

export default class Controller {
  checkRes(req, res, next) {
    if (!req.body.name || !req.body.resolution) {
      throw new ApiError(404);
    }
    next();
  }

  checkName(req, res, next) {
    if (!req.query.name || req.query.name.length > 30) {
      throw new ApiError(400);
    }
    next();
  }

  checkPatIsExist(req, res, next, m = map) {
    if (!m.has(req.body.name)) {
      throw new ApiError(404, `No matches by name: ${req.body.name}`);
    }
    next();
  }

  sendName(req, res, next, m = map) {
    if (m.has(req.query.name)) {
      res.status(200).send(JSON.stringify(m.get(req.query.name)));
    } else {
      res.status(200).send(JSON.stringify('no matches by this name'));
    }
  }

  send200Res(req, res) {
    res.status(200).send('success');
  }
}
