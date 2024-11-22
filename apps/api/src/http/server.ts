import fastifyCors from '@fastify/cors'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUI from '@fastify/swagger-ui'
import fastify from 'fastify'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod'

import { createAccount } from './routes/auth/create-account'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

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

app.register(fastifyCors)

app.register(createAccount)

app.listen({ port: 3333 }).then(() => {
  console.log('> 🌟 O servidor está ativo e pronto para servir! 💾')
})
