const Hapi = require('@hapi/hapi')
require('dotenv').config()

const ClientError = require('./exceptions/ClientError')

const resources = require('./api/med-resources')
const ResourcesService = require('./services/postgres/MedResourcesService')

const owners = require('./api/owners')
const OwnersService = require('./services/postgres/OwnersService')

const pets = require('./api/pets')
const PetsService = require('./services/postgres/PetsService')

const admin = require('./api/admin')
const AdminService = require('./services/postgres/AdminService')

const init = async () => {
  const resourcesService = new ResourcesService()
  const ownersService = new OwnersService()
  const petsService = new PetsService()
  const adminService = new AdminService()

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
    },
    {
      plugin: owners,
      options: {
        service: ownersService
      }
    },
    {
      plugin: pets,
      options: {
        service: petsService
      }
    },
    {
      plugin: admin,
      options: {
        service: adminService
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
