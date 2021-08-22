import currentStorageMethods from '../src/storageClasses/storageFactory.js';
import { storageType } from '../src/config.js';

export default function quit() {
  if (storageType === 'redis') {
    currentStorageMethods.client.quit();
  }
}
