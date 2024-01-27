const autoBind = require('auto-bind')

class PetsHandler {
  constructor (service) {
    this._service = service

    autoBind(this)
  }

  async addPetHandler (request, h) {
    const petId = await this._service.addPet(request.payload)

    const response = h.response({
      status: 'success',
      message: 'Peliharaan berhasil ditambahkan',
      data: {
        petId
      }
    })
    response.code(201)
    return response
  }

  async getPetsHandler () {
    const pets = await this._service.getPets()

    return {
      status: 'success',
      data: {
        pets
      }
    }
  }

  async getPetByIdHandler (request) {
    const { id } = request.params
    const pet = await this._service.getPetById(id)

    return {
      status: 'success',
      data: {
        pet
      }
    }
  }

  async editPetByIdHandler (request) {
    const { id } = request.params

    await this._service.editPetById(id, request.payload)

    return {
      status: 'success',
      message: 'Peliharaan berhasil diperbarui'
    }
  }

  async deletePetByIdHandler (request) {
    const { id } = request.params

    await this._service.deletePetById(id)

    return {
      status: 'success',
      message: 'Peliharaan berhasil dihapus'
    }
  }
}

module.exports = PetsHandler
