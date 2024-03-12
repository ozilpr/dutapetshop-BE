const Joi = require('joi')

const AdminPayloadSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required().pattern(/^[a-zA-Z0-9]{3,30}$/),
  confPassword: Joi.string().required().pattern(/^[a-zA-Z0-9]{3,30}$/),
  fullname: Joi.string().required()
})

module.exports = { AdminPayloadSchema }
