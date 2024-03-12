const PetsPayloadSchema = require('./schema')

const PetsValidator = {
  vaidatePetPayload: (payload) => {
    const validationResult = PetsPayloadSchema(payload)
    if (validationResult.error) throw new Error(validationResult.error.message)
  }
}

module.exports = PetsValidator
