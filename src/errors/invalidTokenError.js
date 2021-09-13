import { INVALID_TOKEN } from "../constants/messages.js";
import { UNAUTHORIZED } from "../constants/statusCodes.js";
import ApiError from "./appError.js";

export default class InvalidTokenError extends ApiError {
  constructor() {
    super(UNAUTHORIZED, INVALID_TOKEN);
  }
}
