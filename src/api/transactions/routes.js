const routes = (handler) => [
  {
    method: 'POST',
    path: '/transaction',
    handler: handler.addTransactionHandler,
    options: {
      auth: 'dutapetshop_jwt'
    }
  },
  {
    method: 'GET',
    path: '/transaction',
    handler: handler.getTransactionsHandler,
    options: {
      auth: 'dutapetshop_jwt'
    }
  },
  {
    method: 'GET',
    path: '/transaction/{id}',
    handler: handler.getTransactionByIdHandler,
    options: {
      auth: 'dutapetshop_jwt'
    }
  },
  {
    method: 'GET',
    path: '/transaction/owner/{ownerId}',
    handler: handler.getTransactionsByOwnerIdHandler,
    options: {
      auth: 'dutapetshop_jwt'
    }
  },
  {
    method: 'DELETE',
    path: '/transaction/{id}',
    handler: handler.deleteTransactionByIdHandler,
    options: {
      auth: 'dutapetshop_jwt'
    }
  }
]

module.exports = routes
