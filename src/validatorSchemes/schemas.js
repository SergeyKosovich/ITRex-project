import Joi from 'joi';

const shemaForResolutionAndName = Joi.object({
  body: Joi.object({
    name: Joi.string().invalid('No patient').min(1).max(30)
      .required(),
    resolution: Joi.string().min(5).max(400).required(),
  }),
});
const schemaForName = Joi.object().keys({
  name: Joi.string().min(1).max(30).required(),
});
export { shemaForResolutionAndName, schemaForName };
