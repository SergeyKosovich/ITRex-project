/* eslint operator-linebreak: ["error", "after"] */
/* eslint-disable camelcase */

import { resolutionsStorageMethods } from '../storageClasses/storageFactory.js';
import ApiError from '../errors/appError.js';
import { TtlDefaultInSeconds } from '../config.js';

export default class Controller {
  getById = async (req, res, next) => {
    const { patient_id } = req.query;
    try {
      const resolution = await resolutionsStorageMethods.getResolutions(
        patient_id,
      );
      if (!resolution) {
        throw new ApiError(404, 'No resolutions');
      }
      res.status(200).json(resolution);
    } catch (error) {
      next(error);
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
    try {
      await resolutionsStorageMethods.setResolution(data);
      res.status(200).send();
    } catch (error) {
      next(error);
    }
  };

  deleteRes = async (req, res, next) => {
    const { patient_id } = req.body;
    const resolution = await resolutionsStorageMethods.getResolutions(
      patient_id,
    );
    try {
      if (!resolution) {
        throw new ApiError(404, 'No patient found');
      }
      await resolutionsStorageMethods.deleteResolution(patient_id);
      res.status(200).send();
    } catch (error) {
      next(error);
    }
  };
}
