import currentStorageMethods from '../storageClasses/storageFactory.js';

export default class Service {
  setResolution = async (name, resolution) => {
    const isResolutionInstorage = await currentStorageMethods.getResolutionInStorage(name);
    if (isResolutionInstorage) {
      let previous = await currentStorageMethods.getResolutionInStorage(name);
      previous += resolution;
      await currentStorageMethods.setResolutionInStorage(name, previous);
      return;
    }
    await currentStorageMethods.setResolutionInStorage(name, resolution);
  };
}
