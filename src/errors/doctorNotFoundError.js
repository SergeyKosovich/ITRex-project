import { DOCTOR_NOT_FOUND } from "../constants/messages.js";
import { NOT_FOUND } from "../constants/statusCodes.js";
import ApiError from "./appError.js";

export default class DoctorNotFoundError extends ApiError {
  constructor() {
    super(NOT_FOUND, DOCTOR_NOT_FOUND);
  }
}
