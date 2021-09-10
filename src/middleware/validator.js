import ApiError from '../errors/appError.js';
import {
  schemaForResolutionAndId,
  schemaForId,
} from '../validatorSchemes/schemas.js';

export default class Validator {
  checkResolution(req, res, next) {
    const schema = schemaForResolutionAndId;
    const { error } = schema.validate({ body: req.body });
    if (error) {
      next(new ApiError(400, 'incorrect name of patient or id value'));
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
}
