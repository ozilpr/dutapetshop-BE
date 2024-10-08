const InvariantError = require('../../exceptions/InvariantError')
const { TransactionsPayloadSchema, TransactionQuerySchema } = require('./schema')

const TransactionsValidator = {
  validateTransactionPayload: (payload) => {
    const validationResult = TransactionsPayloadSchema.validate(payload)
    if (validationResult.error) throw new InvariantError(validationResult.error.message)
  },
  validateTransactionQuery: (query) => {
    const validationResult = TransactionQuerySchema.validate(query)
    if (validationResult.error) throw new InvariantError(validationResult.error.message)
  }
}

module.exports = TransactionsValidator
