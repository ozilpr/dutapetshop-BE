const TransactionsPayloadSchema = require('./schema')

const TransactionsValidator = {
  validateTransactionPayload: (payload) => {
    const validationResult = TransactionsPayloadSchema(payload)
    if (validationResult.error) throw new Error(validationResult.error.message)
  }
}

module.exports = TransactionsValidator
