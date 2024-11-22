import fastifyCors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUI from '@fastify/swagger-ui'
import fastify from 'fastify'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod'

import { errorHandler } from './error-handler'
import { authenticationWithPassword } from './routes/auth/authentication-with-password'
import { createAccount } from './routes/auth/create-account'
import { getProfile } from './routes/auth/get-profile'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.setErrorHandler(errorHandler)

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Slave Next.js SaaS + RBAC',
      description:
        'API SaaS Completo com Next.js, RBAC e Fastify: Do Zero ao Multi-Tenant com Controle de Acesso Avançado.',
      version: '1.0.0',
    },
    servers: [],
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUI, {
  routePrefix: '/docs-slave',
})

app.register(fastifyJwt, {
  secret: 'f9BgyrKOERrNCUEGIdGiuYPxiAM68jwSEowgSyhL2X8=',
})

app.register(fastifyCors)

/**
 * Registros das rotas HTTP
 */
app.register(createAccount)
app.register(authenticationWithPassword)
app.register(getProfile)

app.listen({ port: 3333 }).then(() => {
  console.log('> 🌟 O servidor está ativo e pronto para servir! 💾')
})
