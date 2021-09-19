import asyncRedis from 'async-redis';
import { REDIS_HOST } from '../config.js';

const queueKey = 'queue';
const storageKey = 'storage';

function returnClient() {
  const client = asyncRedis.createClient(REDIS_HOST);
  client.on('error', (err) => {
    console.log(`Error ${err}`);
  });
  // client.FLUSHDB();
  return client;
}

export default class RedisStorage {
  constructor(redis = returnClient()) {
    this.client = redis;
    this.queue = this.client;
    this.storage = this.client;
  }

  async addToque(data, doctorId) {
    await this.client.RPUSH(`${queueKey}:${doctorId}`, data);
  }

  async removeFirstPatientInQueue(doctorId) {
    await this.client.LPOP(`${queueKey}:${doctorId}`);
  }

  async checkFirstPatientInQueue(doctorId) {
    const [patient] = await this.client.lrange(`${queueKey}:${doctorId}`, 0, 0);
    return patient;
  }

  async indexInQueue(name) {
    const value = await this.client.lrange(queueKey, 0, -1);
    const arr = Array.from(value);
    return arr.indexOf(`${name}`);
  }

  async deleteFromQueue(index) {
    const value = await this.client.lrange(queueKey, 0, -1);
    const arr = Array.from(value);
    await this.client.lrem(queueKey, 1, arr[index]);
  }

  async returnQueue() {
    const value = await this.client.lrange(queueKey, 0, -1);
    const arr = Array.from(value);
    return arr;
  }

  async getResolutionInStorage(name) {
    const value = await this.client.get(name);
    return value;
  }

  async setResolutionInStorage(data) {
    if (data.previous) {
      await this.client.setex(data.name, data.ttl, data.previous);
      return;
    }
    await this.client.setex(data.name, data.ttl, data.resolution);
  }

  async deleteResolutionInStorage(name) {
    await this.client.HDEL(storageKey, name);
  }
}
