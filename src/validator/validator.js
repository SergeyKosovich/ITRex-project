import jwt from 'jsonwebtoken';
import ApiError from '../errors/appError.js';
import {
  schemaForResolutionAndId,
  schemaForId,
  schemaQueryName,
  schemaForCredentials,
} from '../validatorSchemes/schemas.js';
import { secretKey } from '../config.js';

export default class Validator {
  checkResolution(req, res, next) {
    const schema = schemaForResolutionAndId;
    const { error } = schema.validate({ body: req.body });
    if (error) {
      return next(new ApiError(400, 'incorrect name of patient or id value'));
    }
    next();
  }

  checkCredentialBody(req, res, next) {
    const schema = schemaForCredentials;
    const { error } = schema.validate({ body: req.body });
    if (error) {
      return next(new ApiError(400, 'incorrect credentials'));
    }
    next();
  }

  checkId(req, res, next) {
    const schema = schemaForId;
    const { error } = schema.validate(req.query);
    if (error) {
      next(new ApiError(400, 'incorrect name of patient'));
    }
    next();
  }

  checkQueryName(req, res, next) {
    const schema = schemaQueryName;
    const { error } = schema.validate(req.query);
    if (error) {
      next(new ApiError(400, 'incorrect name of patient'));
    }
    next();
  }

  checkToken(req, res, next) {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      throw new ApiError(401, 'user is not authorized');
    }
    const decodeData = jwt.verify(token, secretKey);
    req.user = decodeData;
    next();
  }
}
