const autoBind = require('auto-bind')

class TransactionsHandler {
  constructor (service) {
    this._service = service

    autoBind(this)
  }

  async addTransactionHandler (request, h) {
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

  async getTransactionsHandler () {
    const transactions = await this._service.getTransactions()

    return {
      status: 'success',
      data: {
        transactions
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

  async editTransactionByIdHandler (request) {
    const { id } = request.params

    await this._service.editTransactionById(id, request.payload)

    return {
      status: 'success',
      message: 'Transaksi berhasil diperbarui'
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
}

module.exports = TransactionsHandler
