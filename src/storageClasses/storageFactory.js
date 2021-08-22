import RedisStorage from './redisStorage.js';
import InMemoryStorage from './localStorage.js';
import { storageType } from '../config.js';

let env;
// Почему-то докер выдает ошибку когда передаю напрямую storageType, пока что так:
if (storageType === 1 || +storageType === 1) {
  env = 1;
} else {
  env = 2;
}

class StorageFactory {
  static list = {
    1: InMemoryStorage,
    2: RedisStorage,
  };

  create(type) {
    const Memory = StorageFactory.list[type];
    const storage = new Memory();
    storage.type = type;
    return storage;
  }
}

const storage = new StorageFactory();
const currentStorageMethods = storage.create(env);
export default currentStorageMethods;
