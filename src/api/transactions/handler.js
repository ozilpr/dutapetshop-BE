const autoBind = require('auto-bind')

class TransactionsHandler {
  constructor (service) {
    this._service = service

    autoBind(this)
  }

  async addTransactionsHandler (request, h) {
    const transactionId = await this._service.addTransaction(request.payload)

    const response = h.response({
      status: 'success',
      messagge: 'Transaksi berhasil ditambahkan',
      data: {
        transactionId
      }
    })
    response.code(201)
    return response
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

  async getTransactionsHandler () {
    const transactions = await this._service.getTransactions()

    return {
      status: 'success',
      data: {
        transactions
      }
    }
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

  async getTransactionByIdHandler (request) {
    const { id } = request.params
    const transaction = await this._service.getTransactionById(id)

    return {
      status: 'success',
      data: {
        transaction
      }
    }
  }

  async getTransactionDetailByIdHandler (request) {
    const { id } = request.params
    const transactionDetail = await this._service.getTransactionDetailById(id)

    return {
      status: 'success',
      data: {
        transactionDetail
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

  async editTransactionByIdHandler (request) {
    const { id } = request.params

    await this._service.editTransactionById(id, request.payload)

    return {
      status: 'success',
      message: 'Transaksi berhasil diperbarui'
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

  async deleteTransactionByIdHandler (request) {
    const { id } = request.params

    await this._service.deleteTransactionById(id)

    return {
      status: 'success',
      message: 'Transaksi berhasil dihapus'
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

module.exports = TransactionsHandler
