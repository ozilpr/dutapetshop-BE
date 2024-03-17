const Joi = require('joi')

const OwnersPayloadSchema = Joi.object({
  registerCode: Joi.string().required(),
  name: Joi.string().required(),
  phone: Joi.string().regex(/^[0-9]{12,15}$/).allow(null, '')
})

module.exports = { OwnersPayloadSchema }
