import { UNAUTHORIZED } from "../constants/statusCodes.js";
import ApiError from "./appError.js";

export default class InvalidCredentialsError extends ApiError {
  constructor() {
    super(UNAUTHORIZED, "Incorrect credentials");
  }
}
