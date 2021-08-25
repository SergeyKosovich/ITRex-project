import RedisStorage from '../redisStorage.js';
import InMemoryStorage from '../localStorage.js';
import SqlStorage from '../sqlStorage.js';
import { storageType } from '../../config.js';

let env;
if (storageType === 1 || +storageType === 1) {
  env = 1;
} else if (storageType === 2 || +storageType === 2) {
  env = 2;
} else {
  env = 3;
}

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
const currentStorageMethods = storage.create(env);
export default currentStorageMethods;
