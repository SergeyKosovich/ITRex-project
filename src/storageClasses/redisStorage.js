import asyncRedis from 'async-redis';
import { REDIS_PORT } from '../config.js';

export default class RedisStorage {
  constructor() {
    this.client = asyncRedis.createClient(REDIS_PORT);
    this.client.on('error', (err) => {
      console.log(`Error ${err}`);
    });
    this.client.FLUSHDB();
    this.queue = this.client;
    this.storage = this.client;
  }

  async addToque(data) {
    await this.client.RPUSH('queue', data);
  }

  async indexInQueue(name) {
    const value = await this.client.lrange('queue', 0, -1);
    const arr = Array.from(value);
    return arr.indexOf(`${name}`);
  }

  async deleteFromQue(index) {
    const value = await this.client.lrange('queue', 0, -1);
    const arr = Array.from(value);
    await this.client.lrem('queue', 1, arr[index]);
  }

  async removeFirstPatientInQue() {
    await this.client.LPOP('queue');
  }

  async checkFirstPatientInQueue() {
    const [patient] = await this.client.lrange('queue', 0, 0);
    return patient;
  }

  async returnQueue() {
    const value = await this.client.lrange('queue', 0, -1);
    const arr = Array.from(value);
    return arr;
  }

  async getResolutionInStorage(name) {
    const [nameIsExist] = await this.client.HMGET('storage', name);
    return nameIsExist;
  }

  async setResolutionInStorage(name, previous) {
    await this.client.HMSET('storage', name, previous);
  }

  async deleteResolutionInStorage(name) {
    await this.client.HDEL('storage', name);
  }
}
