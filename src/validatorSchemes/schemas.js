import Joi from 'joi';

const shemaForResolutionAndName = Joi.object({
  body: Joi.object({
    name: Joi.string().min(1).max(30).required(),
    resolution: Joi.string().min(5).max(400).required(),  
    ttl: Joi.number().min(1).max(60), 
  }),
});
const schemaForName = Joi.object().keys({
  name: Joi.string().min(1).max(30).required(),
});
export { shemaForResolutionAndName, schemaForName };
