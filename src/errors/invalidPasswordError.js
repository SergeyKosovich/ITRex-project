import { INCORRECT_PASSWORD } from "../constants/messages.js";
import { UNAUTHORIZED } from "../constants/statusCodes.js";
import ApiError from "./appError.js";

export default class InvalidPasswordError extends ApiError {
  constructor() {
    super(UNAUTHORIZED, INCORRECT_PASSWORD);
  }
}
