/* eslint prefer-destructuring: ["error", {AssignmentExpression: {object: true}}] */
/* eslint operator-linebreak: ["error", "after"] */

import { resolutionsStorageMethods } from '../storageClasses/storageFactory.js';
import ApiError from '../errors/appError.js';
import { TtlDefaultInSeconds } from '../config.js';

export default class Controller {
  getByName = async (req, res) => {
    const { name } = req.query;
    const resolution = await resolutionsStorageMethods.getResolutionInStorage(
      name,
    );
    if (resolution) {
      res.status(200).json(resolution);
    } else {
      res.status(200).send('no resolution');
    }
  };

  patchResolution = async (req, res) => {
    const data = {
      name: req.body.name,
      resolution: req.body.resolution,
      ttl: req.body.ttl || TtlDefaultInSeconds,
    };
    const isResolutionInStorage =
      await resolutionsStorageMethods.getResolutionInStorage(data.name);
    if (isResolutionInStorage) {
      data.previous = isResolutionInStorage + data.resolution;
      await resolutionsStorageMethods.setResolutionInStorage(data);
      res.status(200).send();
      return;
    }
    await resolutionsStorageMethods.setResolutionInStorage(data);
    res.status(200).send();
  };

  deleteRes = async (req, res, next) => {
    const { name } = req.body;
    const resolution = await resolutionsStorageMethods.getResolutionInStorage(
      name,
    );
    try {
      if (!resolution) {
        throw new ApiError(404, 'No patient found');
      }
      await resolutionsStorageMethods.deleteResolutionInStorage(name);
      res.status(200).send();
    } catch (error) {
      next(error);
    }
  };
}
