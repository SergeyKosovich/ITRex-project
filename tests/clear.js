import currentStorageMethods from '../src/storageClasses/storageFactory.js';
import { storageType } from '../src/config.js';

export default async function clear() {
  if (storageType === 2) {
    await currentStorageMethods.client.FLUSHDB();
  }
  if (storageType === 1) {
    currentStorageMethods.queqe = [];
    currentStorageMethods.storage = new Map();
  }
}
