import RedisStorage from './redisStorage.js';
import InMemoryStorage from './inMemoryStorage.js';
import SqlStorage from './sqlStorage.js';
import { resolutionsStorage, queueStorage } from '../config.js';

const resolutionStorageType = resolutionsStorage.toString();
const queueStorageType = queueStorage.toString();

class StorageFactory {
  create(storagetype) {
    switch (storagetype) {
      case 1:
        return new InMemoryStorage();

      case 2:
        return new RedisStorage();

      case 3:
        return new SqlStorage();

      default:
        return new InMemoryStorage();
    }
  }
}

const storage = new StorageFactory();
const resolutionsStorageMethods = storage.create(+resolutionStorageType);
const queueStorageMethods = storage.create(+queueStorageType);
export { resolutionsStorageMethods, queueStorageMethods, StorageFactory };
