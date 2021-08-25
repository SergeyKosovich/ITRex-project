import currentStorageMethods from '../storageClasses/storageFactory.js';

export default class Service {
  setResolution = async (name, resolution) => {
    const isResolutionInStorage = await currentStorageMethods.getResolutionInStorage(name);
    if (isResolutionInStorage) {
      let previous = await currentStorageMethods.getResolutionInStorage(name);
      previous += resolution;
      await currentStorageMethods.setResolutionInStorage(
        name,
        previous,
        resolution,
      );
      return;
    }
    await currentStorageMethods.setResolutionInStorage(name, resolution);
  };
}
