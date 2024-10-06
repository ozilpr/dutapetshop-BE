const routes = (handler) => [
  {
    method: 'POST',
    path: '/admin',
    handler: handler.addAdminHandler,
    options: {
      auth: {
        strategy: 'dutapetshop_jwt',
        mode: 'optional'
      }
    }
  },
  {
    method: 'GET',
    path: '/admin/{id}',
    handler: handler.getAdminByIdHandler,
    options: {
      auth: 'dutapetshop_jwt'
    }
  },
  {
    method: 'GET',
    path: '/admin',
    handler: handler.getAdminByNameHandler,
    options: {
      auth: 'dutapetshop_jwt'
    }
  },
  {
    method: 'PUT',
    path: '/admin/{id}',
    handler: handler.editAdminByIdHandler,
    options: {
      auth: 'dutapetshop_jwt'
    }
  },
  {
    method: 'DELETE',
    path: '/admin/{id}',
    handler: handler.deleteAdminByIdHandler,
    options: {
      auth: 'dutapetshop_jwt'
    }
  }
]

module.exports = routes
