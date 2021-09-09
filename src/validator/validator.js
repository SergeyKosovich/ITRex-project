import jwt from "jsonwebtoken";
import ApiError from "../errors/appError.js";
import {
  schemaForResolutionAndId,
  schemaForId,
} from "../validatorSchemes/schemas.js";
import { secretKey } from "../config.js";

export default class Validator {
  checkResolution(req, res, next) {
    const schema = schemaForResolutionAndId;
    const { error } = schema.validate({ body: req.body });
    if (error) {
      return next(new ApiError(400, "incorrect name of patient or id value"));
    }
    next();
  }

  checkId(req, res, next) {
    const schema = schemaForId;
    const { error } = schema.validate(req.query);
    if (error) {
      next(new ApiError(400, "incorrect name of patient"));
    }
    next();
  }

  checkToken(req, res, next) {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      throw new ApiError(403, "user is not authorized");
    }
    // Какую ошибку отсылать при неправильном jwt? или оставляем 500?
    const decodeData = jwt.verify(token, secretKey);
    req.user = decodeData;
    // console.log(decodeData);
    next();
  }
}
