const { AuthenticationsPayloadSchema } = require('./schema')

const AuthenticationsValidator = {
  validateAuthenticationPayload: (payload) => {
    const validationResult = AuthenticationsPayloadSchema.validate(payload)
    if (validationResult.error) throw new Error(validationResult.error.message)
  }
}

module.exports = AuthenticationsValidator
