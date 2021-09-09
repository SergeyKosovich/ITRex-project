import { secretKey } from "../config.js";
import tokenService from "../token/tokenService.js";
import ApiError from "../errors/appError.js";

export default function checkAuth(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      throw new ApiError(401, "User is not authorized");
    }

    const { payload, error } = tokenService.verify(token, secretKey);

    if (error.name === "TokenExpiredError") {
      throw new ApiError(401, "Token expired");
    }

    if (!payload) {
      throw new ApiError(401, "Invalid Token");
    }

    req.user = payload;
    return next();
  } catch (error) {
    return next(error);
  }
}
