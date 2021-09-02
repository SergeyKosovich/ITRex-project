import Joi from 'joi';

const schemaForResolutionAndId = Joi.object({
  body: Joi.object({
    patient_id: Joi.number().min(1).max(32140),
    resolution: Joi.string().min(5).max(400).required(),
    ttl: Joi.number().min(1).max(60),
  }),
});
const schemaForId = Joi.object().keys({
  patient_id: Joi.number().min(1).max(32140),
});
export { schemaForResolutionAndId, schemaForId };
