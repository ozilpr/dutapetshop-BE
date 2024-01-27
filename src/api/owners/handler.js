const autoBind = require('auto-bind')

class OwnersHandler {
  constructor (service) {
    this._service = service

    autoBind(this)
  }

  async addOwnerHandler (request, h) {
    const ownerId = await this._service.addOwner(request.payload)

    const response = h.response({
      status: 'success',
      message: 'Owner berhasil ditambahkan',
      data: {
        ownerId
      }
    })
    response.code(201)
    return response
  }

  async getOwnersHandler () {
    const owners = await this._service.getOwners()

    return {
      status: 'success',
      data: {
        owners
      }
    }
  }

  async editOwnerById (request) {
    const { id } = request.params

    await this._service.editOwnerById(id, request.payload)

    return {
      status: 'success',
      message: 'Owner berhasil diperbarui'
    }
  }

  async deleteOwnerById (request) {
    const { id } = request.params

    await this._service.deleteOwnerById(id)

    return {
      status: 'success',
      message: 'Owner berhasil dihapus'
    }
  }
}

module.exports = OwnersHandler
