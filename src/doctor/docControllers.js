/* eslint operator-linebreak: ["error", "after"] */
/* eslint-disable camelcase */

import { resolutionsStorageMethods } from "../storageClasses/storageFactory.js";
import { TtlDefaultInSeconds } from "../config.js";
import patientStorage from "../repositories/patientStorage.js";
import ResolutionForDoctorDto from "../dtos/resolutionForDoctorDto.js";
import { NO_CONTENT } from "../constants/statusCodes.js";
import prepareName from "../utils/prepareName.js";
import PatientNotFoundError from "../errors/patientNotFoundError.js";
import ResolutionNotFoundError from "../errors/resolutionNotFoundError.js";
import CannotBeDeletedError from "../errors/cannotBeDeletedError.js";

export default class Controller {
  getResolutions = async (req, res, next) => {
    try {
      const name = prepareName(req.query.name);
      const patients = await patientStorage.getPatientsByName(name);

      if (!patients.length) {
        throw new PatientNotFoundError();
      }

      if (patients.length > 1) {
        return res.json({ patients });
      }

      const resolutions =
        await resolutionsStorageMethods.getResolutionInStorage(
          patients[0].patient_id
        );

      if (!resolutions) {
        throw new ResolutionNotFoundError();
      }

      const data = resolutions.map(
        (resolution) => new ResolutionForDoctorDto(patients[0], resolution)
      );

      return res.json({ resolutions: data });
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
        throw new PatientNotFoundError();
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

  deleteResolution = async (req, res, next) => {
    const name = prepareName(req.query.name);
    try {
      const patients = await patientStorage.getPatientsByName(name);
      if (!patients.length) {
        throw new PatientNotFoundError();
      }

      if (patients.length > 1) {
        throw new CannotBeDeletedError();
      }

      const foundAndDeleted =
        await resolutionsStorageMethods.deleteResolutionInStorage(
          patients[0].patient_id,
          req.user.doctor_id
        );

      if (!foundAndDeleted) {
        throw new ResolutionNotFoundError();
      }

      return res.status(NO_CONTENT).json();
    } catch (error) {
      return next(error);
    }
  };
}
