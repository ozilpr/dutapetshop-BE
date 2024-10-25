const InvariantError = require('../../exceptions/InvariantError')
const { TransactionsPayloadSchema, TransactionQuerySchema, TransactionParamsSchema } = require('./schema')

const TransactionsValidator = {
  validateTransactionPayload: (payload) => {
    const validationResult = TransactionsPayloadSchema.validate(payload)
    if (validationResult.error) throw new InvariantError(validationResult.error.message)
  },
  validateTransactionQuery: (query) => {
    const validationResult = TransactionQuerySchema.validate(query)
    if (validationResult.error) throw new InvariantError(validationResult.error.message)
  },
  validateTransactionParams: (params) => {
    const validationResult = TransactionParamsSchema.validate(params)
    if (validationResult.error) throw new InvariantError(validationResult.error.message)
  }
}

module.exports = TransactionsValidator
