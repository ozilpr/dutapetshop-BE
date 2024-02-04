const autoBind = require('auto-bind')

class MedResourcesHandler {
  constructor (service) {
    this._service = service

    autoBind(this)
  }

  async addResourceHandler (request, h) {
    const { name, description = 'no description', type, price } = request.payload

    const resourceId = await this._service.addResource({ name, description, type, price })

    const response = h.response({
      status: 'success',
      message: 'Resource berhasil ditambahkan',
      data: {
        resourceId
      }
    })

    response.code(201)
    return response
  }

  async getResourcesHandler () {
    const resources = await this._service.getResources()
    return {
      status: 'success',
      data: {
        resources
      }
    }
  }

  async getResourceByIdHandler (request) {
    const { id } = request.payload
    const resource = await this._service.getResourceById(id)
    return {
      status: 'success',
      data: {
        resource
      }
    }
  }

  async editResourceByIdHandler (request) {
    const { id } = request.params

    this._service.editResourceById(id, request.payload)

    return {
      status: 'success',
      message: 'Resource berhasil diperbarui'
    }
  }

  async deleteResourceByIdHandler (request) {
    const { id } = request.params
    this._service.deleteResourceById(id)

    return {
      status: 'success',
      message: 'Catatan berhasil dihapus'
    }
  }
}

module.exports = MedResourcesHandler
