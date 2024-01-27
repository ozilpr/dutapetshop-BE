const PetsHandler = require('./handler')
const routes = require('./routes')

module.exports = {
  name: 'pets',
  version: '1.0.0',
  register: async (server, { service }) => {
    const petsHandler = new PetsHandler(service)
    server.route(routes(petsHandler))
  }
}
