/* eslint-disable import/extensions */
import { queqe } from '../storage.js';

export default class Service {
  removeTopPacient(q = queqe) {
    return (req, res, next) => {
      q.shift();
      next();
    };
  }
}
