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
    const res = this.storage.get(name);
    return res;
  }

  setResolutionInStorage(data) {
    if (data.previous) {
      this.storage.set(data.name, data.previous);
    } else {
      this.storage.set(data.name, data.resolution);
    }
    if (data.ttl) {
      setTimeout(() => {
        this.deleteResolutionInStorage(data.name);
      }, data.ttl * 1000);
    }
  }

  deleteResolutionInStorage(name) {
    this.storage.delete(name);
  }
}
