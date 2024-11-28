import fastifyCors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUI from '@fastify/swagger-ui'
import { env } from '@slave/env'
import fastify from 'fastify'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod'

import { errorHandler } from './error-handler'
import { authenticationWithGithub } from './routes/auth/authentication-with-github'
import { authenticationWithPassword } from './routes/auth/authentication-with-password'
import { createAccount } from './routes/auth/create-account'
import { getProfile } from './routes/auth/get-profile'
import { requestPasswordRecover } from './routes/auth/request-password-recovery'
import { resetPassword } from './routes/auth/reset-password'
import { createOrganization } from './routes/org/create-organization'
import { getMembership } from './routes/org/get-membership'
import { getOrganization } from './routes/org/get-organization'
import { getOrganizations } from './routes/org/get-organizations'
import { shutdownOrganization } from './routes/org/shutdown-organization'
import { updateOrganization } from './routes/org/update-organization'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.setErrorHandler(errorHandler)

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Slave Next.js SaaS + RBAC',
      description:
        'API SaaS Completo com Next.js, RBAC e Fastify: Do Zero ao Multi-Tenant com Controle de Acesso Avançado',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUI, {
  routePrefix: '/docs-slave',
})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(fastifyCors)

/**
 * Registros das rotas HTTP
 */
app.register(createAccount)
app.register(authenticationWithPassword)
app.register(getProfile)
app.register(requestPasswordRecover)
app.register(resetPassword)
app.register(authenticationWithGithub)
app.register(createOrganization)
app.register(getMembership)
app.register(getOrganization)
app.register(getOrganizations)
app.register(updateOrganization)
app.register(shutdownOrganization)

app.listen({ port: env.SERVER_PORT }).then(() => {
  console.log('> 🌟 O servidor está ativo e pronto para servir! 💾')
})
