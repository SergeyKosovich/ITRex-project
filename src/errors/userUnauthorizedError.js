import { NOT_AUTORIZED } from "../constants/messages.js";
import { UNAUTHORIZED } from "../constants/statusCodes.js";
import ApiError from "./appError.js";

export default class UserUnauthorizedError extends ApiError {
  constructor() {
    super(UNAUTHORIZED, NOT_AUTORIZED);
  }
}
