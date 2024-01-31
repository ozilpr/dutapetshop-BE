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
    method: 'POST',
    path: '/transaction-detail',
    handler: handler.addTransactionDetailHandler,
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
    path: '/transaction-detail',
    handler: handler.getTransactionDetailsHandler,
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
    path: '/transaction-detail/{id}',
    handler: handler.getTransactionDetailByIdHandler,
    options: {
      auth: 'dutapetshop_jwt'
    }
  },
  {
    method: 'GET',
    path: '/transaction-detail/{ownerId}',
    handler: handler.getTransactionDetailByOwnerId,
    options: {
      auth: 'dutapetshop_jwt'
    }
  },
  {
    method: 'PUT',
    path: '/transaction/{id}',
    handler: handler.editTransactionById,
    options: {
      auth: 'dutapetshop_jwt'
    }
  },
  {
    method: 'PUT',
    path: '/transaction-detail/{id}',
    handler: handler.editTransactionDetailById,
    options: {
      auth: 'dutapetshop_jwt'
    }
  },
  {
    method: 'DELETE',
    path: '/transaction/{id}',
    handler: handler.deleteTransactionById,
    options: {
      auth: 'dutapetshop_jwt'
    }
  },
  {
    method: 'DELETE',
    path: '/transaction-detail/{id}',
    handler: handler.deleteTransactionDetailById,
    options: {
      auth: 'dutapetshop_jwt'
    }
  }
]

module.exports = routes
