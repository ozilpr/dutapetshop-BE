const TransactionDetailsHandler = require('./handler')
const routes = require('./routes')

module.exports = {
  name: 'transactionDetails',
  version: '1.0.0',
  register: async (server, { service }) => {
    const transactionDetailsHandler = new TransactionDetailsHandler(service)
    server.route(routes(transactionDetailsHandler))
  }
}
