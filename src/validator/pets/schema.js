const Joi = require('joi')

const PetsPayloadSchema = Joi.object({
  name: Joi.string().required(),
  type: Joi.string(),
  race: Joi.string(),
  gender: Joi.string(),
  birthdate: Joi.string()
})

module.exports = { PetsPayloadSchema }
