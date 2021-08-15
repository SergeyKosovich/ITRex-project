import { dataStorage } from '../storage.js';

export default class Service {
  setResolution(m = dataStorage) {
    return (req, res, next) => {
      if (m.has(req.body.name)) {
        let previous = m.get(req.body.name);
        previous += req.body.resolution;
        m.set(req.body.name, previous);
        return next();
      }
      m.set(req.body.name, req.body.resolution);
      next();
    };
  }

  deleteRes(m = dataStorage) {
    return (req, res, next) => {
      m.delete(req.body.name);
      next();
    };
  }
}
