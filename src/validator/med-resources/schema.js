const Joi = require('joi')

const MedResourcesPayloadSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string(),
  type: Joi.string(),
  price: Joi.string().required()
})

module.exports = { MedResourcesPayloadSchema }
