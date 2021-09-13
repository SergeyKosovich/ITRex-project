import tokenService from "../token/tokenService.js";
import { EXPIRED_ERROR } from "../constants/messages.js";
import UserUnauthorizedError from "../errors/userUnauthorizedError.js";
import ExpiredTokenError from "../errors/expiredTokenError.js";
import InvalidTokenError from "../errors/invalidTokenError.js";

export default function checkAuth(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      throw new UserUnauthorizedError();
    }

    const { payload, error } = tokenService.verify(token);

    if (error.name === EXPIRED_ERROR) {
      throw new ExpiredTokenError();
    }

    if (!payload) {
      throw new InvalidTokenError();
    }

    req.user = payload;
    return next();
  } catch (error) {
    return next(error);
  }
}
