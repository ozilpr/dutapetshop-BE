const routes = (handler) => [
  {
    method: 'POST',
    path: '/owner',
    handler: handler.addOwner,
    options: {
      auth: 'dutapetshop_jwt'
    }
  },
  {
    method: 'GET',
    path: '/owner',
    handler: handler.getOwners,
    options: {
      auth: 'dutapetshop_jwt'
    }
  },
  {
    method: 'GET',
    path: '/owner/{id}',
    handler: handler.getOwnerById,
    options: {
      auth: 'dutapetshop_jwt'
    }
  },
  {
    method: 'PUT',
    path: '/owner/{id}',
    handler: handler.editOwnerById,
    options: {
      auth: 'dutapetshop_jwt'
    }
  },
  {
    method: 'DELETE',
    path: '/owner/{id}',
    handler: handler.deleteOwnerById,
    options: {
      auth: 'dutapetshop_jwt'
    }
  }
]

module.exports = routes
