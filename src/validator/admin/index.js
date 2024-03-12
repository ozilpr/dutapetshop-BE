const { AdminPayloadSchema } = require('./schema')

const AdminValidator = {
  validateAdminPayload: (payload) => {
    const validationResult = AdminPayloadSchema.validate(payload)
    if (validationResult.error) throw new Error(validationResult.error.message)
  }
}

module.exports = AdminValidator
