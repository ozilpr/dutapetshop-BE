const Joi = require('joi')

const OwnersPayloadSchema = Joi.object({
  registedCode: Joi.string().required(),
  name: Joi.string().required(),
  phone: Joi.string().regex(/^[0-9]{15}$/)
})

module.exports = { OwnersPayloadSchema }
