import { PATIENT_NOT_FOUND } from "../constants/messages.js";
import { NOT_FOUND } from "../constants/statusCodes.js";
import ApiError from "./appError.js";

export default class PatientNotFoundError extends ApiError {
  constructor() {
    super(NOT_FOUND, PATIENT_NOT_FOUND);
  }
}
