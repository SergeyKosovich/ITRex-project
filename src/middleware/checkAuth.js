import { secretKey } from "../config.js";
import tokenService from "../token/tokenService.js";
import ApiError from "../errors/appError.js";
import {
  NOT_AUTORIZED,
  EXPIRED_TOKEN,
  INVALID_TOKEN,
  EXPIRED_ERROR,
} from "../constants/messages.js";
import { UNAUTHORIZED } from "../constants/statusCodes.js";

export default function checkAuth(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      throw new ApiError(UNAUTHORIZED, NOT_AUTORIZED);
    }

    const { payload, error } = tokenService.verify(token, secretKey);

    if (error.name === EXPIRED_ERROR) {
      throw new ApiError(UNAUTHORIZED, EXPIRED_TOKEN);
    }

    if (!payload) {
      throw new ApiError(UNAUTHORIZED, INVALID_TOKEN);
    }

    req.user = payload;
    return next();
  } catch (error) {
    return next(error);
  }
}
