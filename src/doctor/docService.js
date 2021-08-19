import { dataStorage } from '../storage.js';

export default class Service {
  constructor() {
    this.dataStorage = dataStorage;
  }

  setResolution = async (name, resolution) => {
    if (this.dataStorage.has(name)) {
      let previous = this.dataStorage.get(name);
      previous += resolution;
      this.dataStorage.set(name, previous);
      return;
    }
    this.dataStorage.set(name, resolution);
  };
}
