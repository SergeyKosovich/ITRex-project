/* eslint-disable import/extensions */
import { queqe } from '../storage.js';

export default class Service {
  constructor() {
    this.queqe = queqe;
  }

  removeTopPacient() {
    return (req, res, next) => {
      this.queqe.shift();
      next();
    };
  }
}
