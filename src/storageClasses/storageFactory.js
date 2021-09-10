import RedisStorage from './redisStorage.js';
import InMemoryStorage from './inMemoryStorage.js';
import SqlStorage from './sqlStorage.js';

class StorageFactory {
  create(storagetype) {
    switch (storagetype) {
      case 1:
        return new InMemoryStorage();

      case 2:
        return new RedisStorage();

      default:
        return new InMemoryStorage();
    }
  }
}

const storage = new StorageFactory();
const resolutionsStorageMethods = new SqlStorage();
const queueStorageMethods = storage.create(2);
export { resolutionsStorageMethods, queueStorageMethods, StorageFactory };
