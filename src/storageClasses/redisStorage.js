import asyncRedis from 'async-redis';
import { REDIS_HOST } from '../config.js';

function returnClient() {
  const client = asyncRedis.createClient(REDIS_HOST);
  client.on('error', (err) => {
    console.log(`Error ${err}`);
  });
  client.FLUSHDB();
  return client;
}

export default class RedisStorage {
  constructor(redis = returnClient()) {
    this.client = redis;
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
