import RedisStorage from './redisStorage.js';
import InMemoryStorage from './localStorage.js';
import SqlStorage from './sqlStorage.js';
import { StorageType } from '../config.js';

const env = StorageType.toString();

class StorageFactory {
  static list = {
    1: InMemoryStorage,
    2: RedisStorage,
    3: SqlStorage,
  };

  create(type) {
    const Memory = StorageFactory.list[type];
    const storage = new Memory();
    storage.type = type;
    return storage;
  }
}

const storage = new StorageFactory();
const currentStorageMethods = storage.create(+env);
export default currentStorageMethods;
