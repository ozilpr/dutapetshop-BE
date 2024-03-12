const { OwnersPayloadSchema } = require('./schema')

const OwnersValidator = {
  validateOwnerPayload: (payload) => {
    const validationResult = OwnersPayloadSchema(payload)
    if (validationResult.error) throw new Error(validationResult.error.message)
  }
}

module.exports = OwnersValidator
