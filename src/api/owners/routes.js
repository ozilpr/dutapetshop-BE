const routes = (handler) => [
  {
    method: 'POST',
    path: '/owner',
    handler: handler.addOwner
  },
  {
    method: 'GET',
    path: '/owner',
    handler: handler.getOwners
  },
  {
    method: 'GET',
    path: '/owner/{id}',
    handler: handler.getOwnerById
  },
  {
    method: 'PUT',
    path: '/owner/{id}',
    handler: handler.editOwnerById
  },
  {
    method: 'DELETE',
    path: '/owner/{id}',
    handler: handler.deleteOwnerById
  }
]

module.exports = routes
