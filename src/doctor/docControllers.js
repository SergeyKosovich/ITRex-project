/* eslint operator-linebreak: ["error", "after"] */
/* eslint-disable camelcase */

import { resolutionsStorageMethods } from '../storageClasses/storageFactory.js';
import ApiError from '../errors/appError.js';
import { TtlDefaultInSeconds } from '../config.js';

export default class Controller {
  getById = async (req, res) => {
    const { patient_id } = req.query;
    const resolution =
      await resolutionsStorageMethods.getResolutionInStorage(patient_id);
    if (resolution) {
      res.status(200).json(resolution);
    } else {
      res.status(404).send('no resolutions');
    }
  };

  patchResolution = async (req, res, next) => {
    const data = {
      patient_id: req.body.patient_id,
      resolution: req.body.resolution,
      ttl: req.body.ttl || TtlDefaultInSeconds,
    };
    try {
      if (!data.patient_id) {
        throw new ApiError(404, 'No patient found');
      }
    } catch (error) {
      next(error);
    }
    await resolutionsStorageMethods.setResolutionInStorage(data);
    if (data.ttl) {
      setTimeout(async () => {
        await resolutionsStorageMethods.deleteResolutionInStorage(data.patient_id);
      }, data.ttl * 1000);
    }
    res.status(200).send();
  };

  deleteRes = async (req, res, next) => {
    const { patient_id } = req.body;
    const resolution =
      await resolutionsStorageMethods.getResolutionInStorage(patient_id);
    try {
      if (!resolution) {
        throw new ApiError(404, 'No patient found');
      }
      await resolutionsStorageMethods.deleteResolutionInStorage(patient_id);
      res.status(200).send();
    } catch (error) {
      next(error);
    }
  };
}
