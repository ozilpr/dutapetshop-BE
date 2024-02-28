require('dotenv').config()

const Hapi = require('@hapi/hapi')
const Jwt = require('@hapi/jwt')

const ClientError = require('./exceptions/ClientError')

// medical resources
const resources = require('./api/med-resources')
const ResourcesService = require('./services/postgres/MedResourcesService')

// owners
const owners = require('./api/owners')
const OwnersService = require('./services/postgres/OwnersService')

// pets
const pets = require('./api/pets')
const PetsService = require('./services/postgres/PetsService')

// admin
const admin = require('./api/admin')
const AdminService = require('./services/postgres/AdminService')

// authentications
const authentications = require('./api/authentications')
const AuthenticationsService = require('./services/postgres/AuthenticationsService')
const TokenManager = require('./tokenize/TokenManager')

const transactions = require('./api/transactions')
const TransactionsService = require('./services/postgres/TransactionsService')

const transactionDetails = require('./api/transaction-details')
const TransactionDetailsService = require('./services/postgres/TransactionDetailsService')

const init = async () => {
  const resourcesService = new ResourcesService()
  const ownersService = new OwnersService()
  const petsService = new PetsService()
  const adminService = new AdminService()
  const authenticationsService = new AuthenticationsService()
  const transactionsService = new TransactionsService()
  const transactionDetailsService = new TransactionDetailsService()

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
      plugin: Jwt
    }
  ])

  server.auth.strategy('dutapetshop_jwt', 'jwt', {
    keys: process.env.ACCESS_TOKEN_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: process.env.ACCESS_TOKEN_AGE
    },
    validate: (artifacts) => ({
      isValid: true,
      credentials: {
        id: artifacts.decoded.payload.id
      }
    })
  })

  await server.register([
    {
      plugin: authentications,
      options: {
        authenticationsService,
        adminService,
        tokenManager: TokenManager
      }
    },
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
    },
    {
      plugin: transactions,
      options: {
        service: transactionsService
      }
    },
    {
      plugin: transactionDetails,
      options: {
        service: transactionDetailsService
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
