import asyncRedis from 'async-redis';
import { REDIS_PORT } from '../config.js';

export default class RedisStorage {
  constructor() {
    this.client = asyncRedis.createClient(REDIS_PORT);
    this.client.on('error', (err) => {
      console.log(`Error ${err}`);
    });
    this.client.FLUSHDB();
    this.queqe = this.client;
    this.storage = this.client;
  }

  async addToque(data) {
    await this.client.RPUSH('queqe', data);
  }

  async indexInQueqe(name) {
    const value = await this.client.lrange('queqe', 0, -1);
    const arr = Array.from(value);
    return arr.indexOf(`${name}`);
  }

  async deleteFromQue(index) {
    const value = await this.client.lrange('queqe', 0, -1);
    const arr = Array.from(value);
    await this.client.lrem('queqe', 1, arr[index]);
  }

  async removeFirstPatientInQue() {
    await this.client.LPOP('queqe');
  }

  async checkFirstPatientInQueqe() {
    const [patient] = await this.client.lrange('queqe', 0, 0);
    return patient;
  }

  async returnQueqe() {
    const value = await this.client.lrange('queqe', 0, -1);
    const arr = Array.from(value);
    return arr;
  }

  async getResolutionInStorage(name) {
    const [nameIsexist] = await this.client.HMGET('storage', name);
    return nameIsexist;
  }

  async setResolutionInStorage(name, previous) {
    await this.client.HMSET('storage', name, previous);
  }

  async deleteResolutionInstorage(name) {
    await this.client.HDEL('storage', name);
  }
}
