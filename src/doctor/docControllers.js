/* eslint operator-linebreak: ["error", "after"] */
/* eslint-disable camelcase */

import { resolutionsStorageMethods } from "../storageClasses/storageFactory.js";
import ApiError from "../errors/appError.js";
import { TtlDefaultInSeconds } from "../config.js";
import patientStorage from "../repositories/patientStorage.js";
import ResolutionForDoctorDto from "../dtos/resolutionForDoctorDto.js";
import {
  PATIENT_NOT_FOUND,
  RESOLUTIONS_NOT_FOUND,
} from "../constants/messages.js";
import { NOT_FOUND } from "../constants/statusCodes.js";
import prepareNameSearch from "../utils/prepareNameSearch.js";

export default class Controller {
  getResolutions = async (req, res, next) => {
    try {
      const name = prepareNameSearch(req.query.name);
      const patient = await patientStorage.getPatientByName(name);

      if (!patient) {
        throw new ApiError(NOT_FOUND, PATIENT_NOT_FOUND);
      }

      const resolutions =
        await resolutionsStorageMethods.getResolutionInStorage(
          patient.patient_id
        );

      if (!resolutions.length) {
        throw new ApiError(NOT_FOUND, RESOLUTIONS_NOT_FOUND);
      }

      const data = resolutions.map(
        (resolution) => new ResolutionForDoctorDto(resolution, patient)
      );

      return res.json(data);
    } catch (error) {
      return next(error);
    }
  };

  patchResolution = async (req, res, next) => {
    const data = {
      patient_id: req.body.patient_id,
      resolution: req.body.resolution,
      doctor_id: req.user.doctor_id,
      ttl: req.body.ttl || TtlDefaultInSeconds,
    };
    try {
      if (!data.patient_id) {
        throw new ApiError(404, "No patient found");
      }
    } catch (error) {
      next(error);
    }

    await resolutionsStorageMethods.setResolutionInStorage(data);
    if (data.ttl) {
      setTimeout(async () => {
        await resolutionsStorageMethods.deleteResolutionInStorage(
          data.patient_id
        );
      }, data.ttl * 1000);
    }
    res.status(200).send();
  };

  deleteRes = async (req, res, next) => {
    const { patient_id } = req.body;
    const resolution = await resolutionsStorageMethods.getResolutionInStorage(
      patient_id
    );
    try {
      if (!resolution) {
        throw new ApiError(404, "No patient found");
      }
      await resolutionsStorageMethods.deleteResolutionInStorage(patient_id);
      res.status(200).send();
    } catch (error) {
      next(error);
    }
  };
}
