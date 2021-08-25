/* eslint-disable import/extensions */

import currentStorageMethods from '../storageClasses/storageFactory.js';

export default class Service {
  async removeTopPacient() {
    await currentStorageMethods.removeFirstPatientInQue();
  }
}
