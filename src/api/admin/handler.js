const autoBind = require('auto-bind')

class adminHandler {
  constructor (service) {
    this._service = service

    autoBind(this)
  }

  async addAdminHandler (request, h) {
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
