const TransactionsHandler = require('./handler')
const routes = require('./routes')

module.exports = {
  name: 'transactions',
  version: '1.0.0',
  register: async (server, { transactionsService, pdfService, validator }) => {
    const transactionsHandler = new TransactionsHandler(transactionsService, pdfService, validator)
    server.route(routes(transactionsHandler))
  }
}
