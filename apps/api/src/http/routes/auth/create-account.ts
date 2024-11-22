import { hash } from 'bcryptjs'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'

export async function createAccount(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/users',
    {
      schema: {
        tags: ['auth'],
        summary: 'Criar uma nova conta',
        body: z.object({
          name: z.string(),
          email: z.string().email(),
          password: z.string().min(6),
        }),
      },
    },
    async (request, reply) => {
      const { name, email, password } = request.body

      const userWithSameEmail = await prisma.user.findUnique({
        where: {
          email,
        },
      })

      if (userWithSameEmail) {
        return reply.status(400).send({
          message: 'Já existe um usuário cadastrado com esse e-mail.',
        })
      }

      // Divide o e-mail em duas partes, separando pelo caractere '@'.
      // A segunda parte (o domínio) é atribuída à variável 'domain'.
      const [, domain] = email.split('@')

      // Verifica se existe uma organização no banco de dados cujo domínio coincide com o domínio do e-mail do usuário.
      // Além disso, verifica se a organização está configurada para adicionar usuários automaticamente pelo domínio.
      const autoJoinOrganization = await prisma.organization.findFirst({
        where: {
          domain, // O domínio extraído do e-mail é usado como critério de busca.
          shouldAttachUsersByDomain: true, // Condição para organizações que aceitam usuários automaticamente pelo domínio.
        },
      })

      const passwordHash = await hash(password, 2)

      await prisma.user.create({
        data: {
          name,
          email,
          passwordHash,
          member_on: autoJoinOrganization
            ? {
                // Se uma organização correspondente foi encontrada:
                create: {
                  organizationId: autoJoinOrganization.id, // Associa o usuário a essa organização.
                },
              }
            : undefined, // Caso contrário, não associa o usuário a nenhuma organização.
        },
      })

      return reply.status(201).send()
    },
  )
}
