const Joi = require('joi')

const TransactionsSchema = Joi.object({
  resourceId: Joi.string().required(),
  quantity: Joi.number().required(),
  price: Joi.number().required()
})

const TransactionsPayloadSchema = Joi.object({
  ownerId: Joi.string().required(),
  discount: Joi.number().allow(null, ''),
  totalPrice: Joi.number().required(),
  transactionsData: Joi.array().items(TransactionsSchema).min(1).required()
})

const TransactionQuerySchema = Joi.object({
  startDate: Joi.date().allow(null, ''),
  endDate: Joi.date().allow(null, '')
})

module.exports = { TransactionsPayloadSchema, TransactionQuerySchema }
