import { INCORRECT_LOGIN } from "../constants/messages.js";
import { UNAUTHORIZED } from "../constants/statusCodes.js";
import ApiError from "./appError.js";

export default class InvalidLoginError extends ApiError {
  constructor() {
    super(UNAUTHORIZED, INCORRECT_LOGIN);
  }
}
