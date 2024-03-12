const autoBind = require('auto-bind')

class adminHandler {
  constructor (service, validator) {
    this._service = service
    this._validator = validator

    autoBind(this)
  }

  async addAdminHandler (request, h) {
    await this._validator.validateAdminPayload(request.payload)

    const adminId = await this._service.addAdmin(request.payload)

    const response = h.response({
      status: 'success',
      message: 'Admin berhasil ditambahkan',
      data: {
        adminId
      }
    })
    response.code(201)
    return response
  }

  async getAdminByIdHandler (request) {
    const { id } = request.params
    const admin = await this._service.getAdminById(id)

    return {
      status: 'success',
      data: {
        admin
      }
    }
  }

  async getAdminByUsernameHandler (request) {
    const admin = await this._service.getAdminByUsername(request.query)

    return {
      status: 'success',
      data: {
        admin
      }
    }
  }

  async editAdminByIdHandler (request) {
    await this._validator.validateAdminPayload(request.payload)

    const { id } = request.params
    await this._service.editAdminById(id, request.payload)

    return {
      status: 'success',
      message: 'Admin berhasil diperbarui'
    }
  }

  async deleteAdminByIdHandler (request) {
    const { id } = request.params
    await this._service.deleteAdminById(id)

    return {
      status: 'success',
      message: 'Admin berhasil dihapus'
    }
  }
}

module.exports = adminHandler
