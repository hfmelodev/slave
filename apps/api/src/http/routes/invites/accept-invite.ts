import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'

import { BadRequestError } from '../_errors/bad-request-error'

export async function acceptInvite(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '/invites/:inviteid/accept',
      {
        schema: {
          tags: ['invites'],
          summary: 'Aceitar convite',
          security: [{ bearerAuth: [] }],
          params: z.object({
            inviteid: z.string().uuid(),
          }),
          response: {
            204: z.null(),
          },
        },
      },
      async (request, reply) => {
        const userId = await request.getCurrentUserId()

        const { inviteid } = request.params

        const invite = await prisma.invite.findUnique({
          where: {
            id: inviteid,
          },
        })

        if (!invite) {
          throw new BadRequestError('Convite nao encontrado ou expirado.')
        }

        const user = await prisma.user.findUnique({
          where: {
            id: userId,
          },
        })

        if (!user) {
          throw new BadRequestError('Usuário nao encontrado.')
        }

        // Verifica se o convite pertence ao mesmo email do usuário
        if (invite.email !== user.email) {
          throw new BadRequestError('Convite nao pertence ao usuário.')
        }

        // Adiciona o membro na organização e deleta o convite
        await prisma.$transaction([
          prisma.member.create({
            data: {
              userId,
              organizationId: invite.organizationId,
              role: invite.role,
            },
          }),

          prisma.invite.delete({
            where: {
              id: inviteid,
            },
          }),
        ])

        return reply.status(204).send()
      },
    )
}
