const Hapi = require('@hapi/hapi')
require('dotenv').config()

const ClientError = require('./exceptions/ClientError')

const resources = require('./api/med-resources')
const ResourcesService = require('./services/postgres/medResourcesService')

const init = async () => {
  const resourcesService = new ResourcesService()
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*']
      }
    }
  })

  await server.register([
    {
      plugin: resources,
      options: {
        service: resourcesService
      }
    }
  ])

  server.ext('onPreResponse', (request, h) => {
    const { response } = request

    if (response instanceof Error) {
      if (response instanceof ClientError) {
        const newResponse = h.response({
          status: 'fail',
          message: response.message
        })
        newResponse.code(response.statusCode)
        return newResponse
      }

      if (!response.isServer) {
        return h.continue
      }

      const newResponse = h.response({
        status: 'error',
        message: 'terjadi kegagalan pada server kami'
      })
      newResponse.code(500)
      return newResponse
    }
    return h.continue
  })

  await server.start()
  console.log(`server berjalan pada ${server.info.uri}`)
}

init()
