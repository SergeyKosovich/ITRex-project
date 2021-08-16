import ApiError from '../errors/appError.js';

export default class Validator {
  checkName(req, res, next) {
    if (!req.body.name) {
      throw new ApiError(400, 'incorrect input of name');
    }
    next();
  }
}
