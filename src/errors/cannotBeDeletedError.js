import { CANNOT_DELETE } from "../constants/messages.js";
import { CONFLICT } from "../constants/statusCodes.js";
import ApiError from "./appError.js";

export default class CannotBeDeletedError extends ApiError {
  constructor() {
    super(CONFLICT, CANNOT_DELETE);
  }
}
