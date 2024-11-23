import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'

export async function requestPasswordRecover(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/password/recover',
    {
      schema: {
        tags: ['auth'],
        summary: 'Redefinir senha do usuário por e-mail',
        body: z.object({
          email: z.string().email(),
        }),
        response: {
          201: z.null(),
        },
      },
    },
    async (request, reply) => {
      const { email } = request.body

      const userFromEmail = await prisma.user.findUnique({
        where: { email },
      })

      if (!userFromEmail) {
        // Não queremos que as pessoas saibam se o usuário realmente existe
        return reply.status(201).send()
      }

      const { id: code } = await prisma.token.create({
        data: {
          type: 'PASSWORD_RECOVERY',
          userId: userFromEmail.id,
        },
      })

      // Enviar e-mail com link de recuperação de senha
      console.log('> 🔑 Token de Recuperação de Senha:', code)

      return reply.status(201).send()
    },
  )
}
