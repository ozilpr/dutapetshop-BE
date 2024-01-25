const ResourcesHandler = require('./handler')
const routes = require('./routes')

module.exports = {
  name: 'resources',
  version: '1.0.0',
  register: async (server, { service }) => {
    const resourcesHandler = new ResourcesHandler(service)
    server.route(routes(resourcesHandler))
  }
}
