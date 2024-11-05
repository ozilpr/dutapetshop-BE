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
  endDate: Joi.date().allow(null, ''),
  ownerId: Joi.string()
    .regex(/^owner-[A-Za-z0-9_-]{8}$/)
    .allow(null, '')
})
  .custom((value, helpers) => {
    const { startDate, endDate } = value

    // Check if only one of them is defined
    if ((startDate && !endDate) || (!startDate && endDate)) {
      return helpers.error('bothStartEndDates') // Custom error key
    }

    return value
  }, 'Start and End Date validation')
  .messages({
    bothStartEndDates: 'Tanggal mulai dan tanggal akhir harus diisi atau keduanya harus kosong'
  })

const TransactionParamsSchema = Joi.object({
  id: Joi.alternatives()
    .try(Joi.string().regex(/^owner-[A-Za-z0-9_-]{8}$/), Joi.string().regex(/^transaction-[A-Za-z0-9_-]{8}$/))
    .allow(null, '')
})

module.exports = { TransactionsPayloadSchema, TransactionQuerySchema, TransactionParamsSchema }
