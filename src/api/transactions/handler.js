const autoBind = require('auto-bind')

class TransactionsHandler {
  constructor(transactionsService, pdfService, validator) {
    this._transactionsService = transactionsService
    this._pdfService = pdfService
    this._validator = validator

    autoBind(this)
  }

  async addTransactionHandler(request, h) {
    await this._validator.validateTransactionPayload(request.payload)

    const { transactionId, transactionItems } = await this._transactionsService.addTransaction(request.payload)

    const response = h.response({
      status: 'success',
      messagge: 'Transaksi berhasil ditambahkan',
      data: {
        transactionId: transactionId,
        transactionItems: transactionItems
      }
    })
    response.code(201)
    return response
  }

  async getTransactionsHandler(request) {
    await this._validator.validateTransactionQuery(request.query)

    const transactions = await this._transactionsService.getTransactions(request.query)

    return {
      status: 'success',
      data: transactions
    }
  }

  async getTransactionsByOwnerIdHandler(request) {
    await this._validator.validateTransactionQuery(request.query)

    const { ownerId } = request.params

    await this._validator.validateTransactionParams({ id: ownerId })

    const transaction = await this._transactionsService.getTransactionsByOwnerId(ownerId, request.query)

    return {
      status: 'success',
      data: transaction
    }
  }

  async generateTransactionPdfHandler(request, h) {
    try {
      // Validate the query parameters
      await this._validator.validateTransactionQuery(request.query)

      const { startDate, endDate, ownerId } = request.query

      // Fetch transactions based on ownerId
      const transactions = ownerId
        ? await this._transactionsService.getTransactionsByOwnerId(ownerId, request.query)
        : await this._transactionsService.getTransactions(request.query)

      // Generate PDF
      const pdfBuffer = await this._pdfService.generateTransactionPdf(transactions, request.query)
      const buffer = Buffer.from(pdfBuffer)

      const filename = () => {
        if (startDate && endDate) return `transaksi-${startDate}-${endDate}`
        if (startDate) return `transactions-${startDate}`
        if (endDate) return `transactions-${endDate}`
        return `transaksi-${new Date().toISOString()}`
      }

      // Prepare the response
      const response = h.response(buffer)
      response.type('application/pdf')
      response.header('Content-Disposition', `attachment; filename="${filename()}.pdf"`)

      return response
    } catch (error) {
      console.error(error)
    }
  }

  async deleteTransactionByIdHandler(request) {
    await this._validator.validateTransactionParams(request.params)

    const { id } = request.params

    await this._transactionsService.deleteTransactionById(id)

    return {
      status: 'success',
      message: 'Transaksi berhasil dihapus'
    }
  }
}

module.exports = TransactionsHandler
