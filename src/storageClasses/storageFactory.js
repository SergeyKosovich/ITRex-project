import RedisStorage from './redisStorage.js';
import InMemoryStorage from './localStorage.js';
import SqlStorage from './sqlStorage.js';

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
const resolutionsStorageMethods = storage.create(3);
const queueStorageMethods = storage.create(2);
export { resolutionsStorageMethods, queueStorageMethods, StorageFactory };
