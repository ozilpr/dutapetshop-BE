const Joi = require('joi')

const TransactionsSchema = Joi.object({
  resourceId: Joi.string().required(),
  quantity: Joi.number().required(),
  discount: Joi.number().allow(null, ''),
  discountType: Joi.string().allow(null, '')
})

const TransactionsPayloadSchema = Joi.object({
  ownerId: Joi.string().required(),
  transactionsData: Joi.array().items(TransactionsSchema).min(1).required()
})

module.exports = { TransactionsPayloadSchema }
