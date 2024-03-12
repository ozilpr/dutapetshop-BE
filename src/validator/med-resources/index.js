const { MedResourcesPayloadSchema } = require('./schema')

const MedResourcesValidator = {
  validateMedResourcePayload: (payload) => {
    const validationResult = MedResourcesPayloadSchema(payload)
    if (validationResult.error) throw new Error(validationResult.error.message)
  }
}

module.exports = MedResourcesValidator
