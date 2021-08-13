/* eslint-disable import/extensions */
import { queqe, map } from '../consts.js';

export default class Service {
  addToQue(req, res, next, que = queqe) {
    que.push(req.body.name);
    next();
  }

  removeAfterTtl(name, m = map, q = queqe) {
    m.delete(name);
    const index = q.indexOf(name);
    q.splice(index, 1);
  }

  removeTopPac(req, res, next, q = queqe) {
    q.shift();
    next();
  }
}
