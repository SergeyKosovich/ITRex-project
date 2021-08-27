import currentStorageMethods from '../src/storageClasses/storageFactory.js';
import { storageType } from '../src/config.js';

export default function quit() {
  if (storageType === 2) {
    currentStorageMethods.client.quit();
  }
}
