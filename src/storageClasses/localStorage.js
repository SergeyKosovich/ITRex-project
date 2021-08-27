const queqe = [];
const dataStorage = new Map();

export default class InMemoryStorage {
  constructor() {
    this.queqe = queqe;
    this.storage = dataStorage;
  }

  addToque(data) {
    this.queqe.push(data);
  }

  indexInQueqe(name) {
    return this.queqe.indexOf(name);
  }

  deleteFromQue(index) {
    this.queqe.splice(index, 1);
  }

  removeFirstPatientInQue() {
    this.queqe.shift();
  }

  checkFirstPatientInQueqe() {
    return this.queqe[0];
  }

  returnQueqe() {
    return this.queqe;
  }

  getResolutionInStorage(name) {
    const res = this.storage.get(name);
    return res;
  }

  setResolutionInStorage(name, previous) {
    this.storage.set(name, previous);
  }

  deleteResolutionInstorage(name) {
    this.storage.delete(name);
  }
}
