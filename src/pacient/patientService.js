/* eslint-disable import/extensions */
import { queqe } from '../storage.js';

export default class Service {
  constructor() {
    this.queqe = queqe;
  }

  removeTopPacient() {
    this.queqe.shift();
  }
}
