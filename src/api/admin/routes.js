const routes = (handler) => [
  {
    method: 'POST',
    path: '/admin',
    handler: handler.addAdminHandler
  },
  {
    method: 'GET',
    path: '/admin/{id}',
    handler: handler.getAdminByIdHandler
  },
  {
    method: 'GET',
    path: '/admin/{username}',
    handler: handler.getAdminByUsernameHandler
  },
  {
    method: 'PUT',
    path: '/admin/{id}',
    handler: handler.editAdminByIdHandler
  },
  {
    method: 'DELETE',
    path: '/admin/{id}',
    handler: handler.deleteAdminByIdHandler
  }
]

module.exports = routes
