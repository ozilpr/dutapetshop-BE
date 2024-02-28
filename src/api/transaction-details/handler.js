const autoBind = require('auto-bind')

class TransactionDetailsHandler {
  constructor (service) {
    this._service = service

    autoBind(this)
  }

  async addTransactionDetailHandler (request, h) {
    const transactionDetailId = await this._service.addTransactionDetail(request.payload)

    const response = h.response({
      status: 'success',
      message: 'Detail transaksi berhasil ditambahkan',
      data: {
        transactionDetailId
      }
    })
    response.code(201)
    return response
  }

  async getTransactionDetailsHandler () {
    const transactionDetails = await this._service.getTransactionDetails()

    return {
      status: 'success',
      data: {
        transactionDetails
      }
    }
  }

  async getTransactionDetailByIdHandler (request) {
    const { id } = request.params
    const transactionDetailId = await this._service.getTransactionDetailById(id)

    return {
      status: 'success',
      data: {
        transactionDetailId
      }
    }
  }

  async getTransactionDetailByOwnerIdHandler (request) {
    const { ownerId } = request.params
    const transactionDetail = await this._service.getTransactionDetailByOwnerId(ownerId)

    return {
      status: 'success',
      data: {
        transactionDetail
      }
    }
  }

  async editTransactionDetailByIdHandler (request) {
    const { id } = request.params

    await this._service.editTransactionDetailById(id, request.payload)

    return {
      status: 'success',
      message: 'Detail transaksi berhasil diperbarui'
    }
  }

  async deleteTransactionDetailByIdHandler (request) {
    const { id } = request.params

    await this._service.deleteTransactionDetailById(id)

    return {
      status: 'success',
      message: 'Detail transaksi berhasil dihapus'
    }
  }
}

module.exports = TransactionDetailsHandler
