const autoBind = require('auto-bind')

class TransactionsHandler {
  constructor(service, validator) {
    this._service = service
    this._validator = validator

    autoBind(this)
  }

  async addTransactionHandler(request, h) {
    console.log(request.payload)
    await this._validator.validateTransactionPayload(request.payload)

    const transactions = await this._service.addTransaction(request.payload)

    const response = h.response({
      status: 'success',
      messagge: 'Transaksi berhasil ditambahkan',
      data: {
        transactions
      }
    })
    response.code(201)
    return response
  }

  async getTransactionsHandler(request) {
    await this._validator.validateTransactionQuery(request.query)

    const transactions = await this._service.getTransactions(request.query)

    return {
      status: 'success',
      data: transactions
    }
  }

  async getTransactionByIdHandler(request) {
    const transaction = await this._service.getTransactionById(request.params)

    return {
      status: 'success',
      data: transaction
    }
  }

  async getTransactionsByOwnerIdHandler(request) {
    const transaction = await this._service.getTransactionsByOwnerId(request.params)

    return {
      status: 'success',
      data: transaction
    }
  }

  async deleteTransactionByIdHandler(request) {
    const { id } = request.params

    await this._service.deleteTransactionById(id)

    return {
      status: 'success',
      message: 'Transaksi berhasil dihapus'
    }
  }
}

module.exports = TransactionsHandler
