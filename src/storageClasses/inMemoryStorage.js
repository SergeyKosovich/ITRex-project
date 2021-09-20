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

  deleteFromQueue(index) {
    this.queue.splice(index, 1);
  }

  removeFirstPatientInQueue() {
    this.queue.shift();
  }

  checkFirstPatientInQueue() {
    return this.queue[0];
  }

  returnQueue() {
    return this.queue;
  }

  getResolutionInStorage(name) {
    return this.storage.get(name);
  }

  setResolutionInStorage(name, previous) {
    this.storage.set(name, previous);
  }

  deleteResolutionInStorage(name) {
    this.storage.delete(name);
  }
}
