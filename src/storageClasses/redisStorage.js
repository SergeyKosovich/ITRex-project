import asyncRedis from 'async-redis';
import { REDIS_HOST } from '../config.js';

const queueKey = 'queue';
const storageKey = 'storage';

function returnClient() {
  const client = asyncRedis.createClient(REDIS_HOST);
  client.on('error', (err) => {
    console.log(`Error ${err}`);
  });
  return client;
}

export default class RedisStorage {
  constructor(redis = returnClient()) {
    this.client = redis;
    this.queue = this.client;
    this.storage = this.client;
  }

  async addToque(data) {
    await this.client.RPUSH(queueKey, data);
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

  async removeFirstPatientInQueue() {
    await this.client.LPOP(queueKey);
  }

  async checkFirstPatientInQueue() {
    const [patient] = await this.client.lrange(queueKey, 0, 0);
    return patient;
  }

  async returnQueue() {
    const value = await this.client.lrange(queueKey, 0, -1);
    const arr = Array.from(value);
    return arr;
  }

  async getResolutions(name) {
    const value = await this.client.get(name);
    return value;
  }

  async setResolution(data) {
    if (data.previous) {
      await this.client.setex(data.name, data.ttl, data.previous);
      return;
    }
    await this.client.setex(data.name, data.ttl, data.resolution);
  }

  async deleteResolution(name) {
    await this.client.HDEL(storageKey, name);
  }
}
