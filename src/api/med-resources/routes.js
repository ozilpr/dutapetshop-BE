const routes = (handler) => [
  {
    method: 'POST',
    path: '/resource',
    handler: handler.addResourceHandler
  },
  {
    method: 'GET',
    path: '/resource',
    handler: handler.getResourcesHandler
  },
  {
    method: 'GET',
    path: '/resource/{id}',
    handler: handler.getResourceById
  },
  {
    method: 'PUT',
    path: '/resource/{id}',
    handler: handler.editResourceById
  },
  {
    method: 'PUT',
    path: '/resource/{id}',
    handler: handler.deleteResourceById
  }
]

module.exports = routes
