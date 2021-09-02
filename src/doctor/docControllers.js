/* eslint prefer-destructuring: ["error", {AssignmentExpression: {object: true}}] */
/* eslint operator-linebreak: ["error", "after"] */

import { resolutionsStorageMethods } from '../storageClasses/storageFactory.js';
import ApiError from '../errors/appError.js';
import { TtlDefaultInSeconds } from '../config.js';

export default class Controller {
  getByName = async (req, res) => {
    const { name } = req.query;
    const resolution =
      await resolutionsStorageMethods.getResolutionInStorage(name);
    if (resolution) {
      res.status(200).json(resolution);
    } else {
      res.status(200).send('no resolution');
    }
  };

  patchResolution = async (req, res) => {
    const { name, resolution } = req.body;
    const ttl = req.body.ttl || TtlDefaultInSeconds;
    const isResolutionInStorage =
      await resolutionsStorageMethods.getResolutionInStorage(name);
    if (isResolutionInStorage) {
      let previous = await resolutionsStorageMethods.getResolutionInStorage(name);
      previous += resolution;
      await resolutionsStorageMethods.setResolutionInStorage(name, previous, resolution);
      res.status(200).send();
      return;
    }
    await resolutionsStorageMethods.setResolutionInStorage(name, resolution);
    if (ttl) {
      setTimeout(async () => {
        await resolutionsStorageMethods.deleteResolutionInStorage(name);
      }, ttl * 1000);
    }
    res.status(200).send();
  };

  deleteRes = async (req, res, next) => {
    const { name } = req.body;
    const isResolutionInStorage =
      await resolutionsStorageMethods.getResolutionInStorage(name);
    try {
      if (!isResolutionInStorage) {
        throw new ApiError(404, 'No patient found');
      }
      await resolutionsStorageMethods.deleteResolutionInStorage(name);
      res.status(200).send();
    } catch (error) {
      next(error);
    }
  };
}
