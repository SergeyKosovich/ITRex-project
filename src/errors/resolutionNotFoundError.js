import { RESOLUTION_NOT_FOUND } from "../constants/messages.js";
import { NOT_FOUND } from "../constants/statusCodes.js";
import ApiError from "./appError.js";

export default class ResolutionNotFoundError extends ApiError {
  constructor() {
    super(NOT_FOUND, RESOLUTION_NOT_FOUND);
  }
}
