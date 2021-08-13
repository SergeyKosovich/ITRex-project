/* eslint-disable import/extensions */
import { map } from '../consts.js';

export default class Service {
  setResolution(req, res, next, m = map) {
    if (m.has(req.body.name)) {
      let previous = m.get(req.body.name);
      previous += req.body.resolution;
      m.set(req.body.name, previous);
      return next();
    }
    m.set(req.body.name, req.body.resolution);
    next();
  }

  deleteRes(req, res, next, m = map) {
    m.delete(req.body.name);
    next();
  }
}
