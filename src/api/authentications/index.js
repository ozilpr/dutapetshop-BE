const AuthenticationsHandler = require('./handler')
const routes = require('./routes')

module.exports = {
  name: 'Authentications',
  version: '1.0.0',
  register: async (server, {
    authenticationsService,
    adminService,
    tokenManager
  }) => {
    const authenticationsHandler = new AuthenticationsHandler(
      authenticationsService,
      adminService,
      tokenManager
    )

    server.route(routes(authenticationsHandler))
  }
}
