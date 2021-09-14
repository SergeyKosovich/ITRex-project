import { EMAIL_EXIST } from "../constants/messages.js";
import { CONFLICT } from "../constants/statusCodes.js";
import ApiError from "./appError.js";

export default class EmailExistError extends ApiError {
  constructor() {
    super(CONFLICT, EMAIL_EXIST);
  }
}
