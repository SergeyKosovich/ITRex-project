const queueInMemory = [];
const resolutionsInMemory = new Map();

export default class InMemoryStorage {
  constructor(queue = queueInMemory, dataStorage = resolutionsInMemory) {
    this.queue = queue;
    this.storage = dataStorage;
  }

  addToque(data) {
    this.queue.push(data);
  }

  indexInQueue(name) {
    return this.queue.indexOf(name);
  }

  deleteFromQue(index) {
    this.queue.splice(index, 1);
  }

  removeFirstPatientInQue() {
    this.queue.shift();
  }

  checkFirstPatientInQueue() {
    return this.queue[0];
  }

  returnQueue() {
    return this.queue;
  }

  getResolutionInStorage(name) {
    const res = this.storage.get(name);
    return res;
  }

  setResolutionInStorage(name, previous) {
    this.storage.set(name, previous);
  }

  deleteResolutionInStorage(name) {
    this.storage.delete(name);
  }
}
