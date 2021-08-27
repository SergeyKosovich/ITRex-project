/* eslint prefer-destructuring: ["error", {AssignmentExpression: {object: true}}] */
/* eslint operator-linebreak: ["error", "after"] */
import ApiError from '../errors/appError.js';
import currentStorageMethods from '../storageClasses/storageFactory.js';
import { TtldefaultInSeconds } from '../config.js';

export default class Controller {
  getByName = async (req, res) => {
    const { name } = req.query;
    const isResolutionInstorage =
      await currentStorageMethods.getResolutionInStorage(name);
    if (isResolutionInstorage) {
      res.status(200).json(isResolutionInstorage);
    } else {
      res.status(200).send('no resolution');
    }
  };

  patchResolution = async (req, res) => {
    const { name, resolution } = req.body;
    const ttl = req.body.ttl || TtldefaultInSeconds;
    const isResolutionInstorage =
      await currentStorageMethods.getResolutionInStorage(name);
    if (isResolutionInstorage) {
      let previous = await currentStorageMethods.getResolutionInStorage(name);
      previous += resolution;
      await currentStorageMethods.setResolutionInStorage(name, previous);
      res.status(200).send();
      return;
    }
    await currentStorageMethods.setResolutionInStorage(name, resolution);
    if (ttl) {
      setTimeout(async () => {
        await currentStorageMethods.deleteResolutionInstorage(name);
      }, ttl * 1000);
    }
    res.status(200).send();
  };

  deleteRes = async (req, res, next) => {
    const isResolutionInstorage =
    await currentStorageMethods.getResolutionInStorage(req.body.name);
    try {
      if (!isResolutionInstorage) {
        throw new ApiError(404, 'No patient found');
      }
      await currentStorageMethods.deleteResolutionInstorage(req.body.name);
      res.status(200).send();
    } catch (error) {
      next(error);
    }
  };
}
