const routes = (handler) => [
  {
    method: 'POST',
    path: '/pet',
    handler: handler.addPetHandler
  },
  {
    method: 'GET',
    path: '/pet',
    handler: handler.getPetsHandler
  },
  {
    method: 'GET',
    path: '/pet/{id}',
    handler: handler.getPetByIdHandler
  },
  {
    method: 'PUT',
    path: '/pet/{id}',
    handler: handler.editPetByIdHandler
  },
  {
    method: 'DELETE',
    path: '/pet/{id}',
    handler: handler.deletePetByIdHandler
  }
]

module.exports = routes
