import ApiError from '../errors/appError.js';
import {
  schemaForResolutionAndName,
  schemaForName,
} from '../validatorSchemes/schemas.js';

export default class Validator {
  checkRes(req, res, next) {
    const schema = schemaForResolutionAndName;
    const { error } = schema.validate({ body: req.body });
    if (error) {
      next(new ApiError(400, 'incorrect name of patient or resolution value'));
    }
    next();
  }

  checkName(req, res, next) {
    const schema = schemaForName;
    const { error } = schema.validate(req.query);
    if (error) {
      next(new ApiError(400, 'incorrect name of patient'));
    }
    next();
  }
}
