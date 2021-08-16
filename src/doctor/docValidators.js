import Joi from 'joi';
import ApiError from '../errors/appError.js';

export default class Validator {
  checkRes(req, res, next) {
    const schema = Joi.object({
      body: Joi.object({
        name: Joi.string().invalid('No patient').min(1).max(30)
          .required(),
        resolution: Joi.string().min(5).max(400).required(),
      }),
    });
    const { error } = schema.validate({ body: req.body });
    if (error) {
      throw new ApiError(400, 'incorrect name of patient or resolution value');
    }
    next();
  }

  checkName(req, res, next) {
    const schema = Joi.object().keys({
      name: Joi.string().min(1).max(30).required(),
    });
    const { error } = schema.validate(req.query);
    if (error) {
      throw new ApiError(400, 'incorrect name of patient');
    }
    next();
  }
}
