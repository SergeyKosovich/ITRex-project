import { EXPIRED_TOKEN } from "../constants/messages.js";
import { UNAUTHORIZED } from "../constants/statusCodes.js";
import ApiError from "./appError.js";

export default class ExpiredTokenError extends ApiError {
  constructor() {
    super(UNAUTHORIZED, EXPIRED_TOKEN);
  }
}
