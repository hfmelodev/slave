import { roleSchema } from '@slave/auth'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { getUserPermission } from '@/utils/get-user-permission'

import { BadRequestError } from '../_errors/bad-request-error'
import { UnauthorizedError } from '../_errors/unauthorized-error'

export async function createInvite(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '/organizations/:slug/invites',
      {
        schema: {
          tags: ['invites'],
          summary: 'Criação de um convite',
          security: [{ bearerAuth: [] }],
          body: z.object({
            email: z.string().email(),
            role: roleSchema,
          }),
          params: z.object({
            slug: z.string(),
          }),
          response: {
            201: z.object({
              inviteId: z.string().uuid(),
              email: z.string().email(),
            }),
          },
        },
      },
      async (request, reply) => {
        const { slug } = request.params

        const userId = await request.getCurrentUserId()

        const { organization, membership } =
          await request.getUserMembership(slug)

        const { cannot } = getUserPermission(userId, membership.role)

        if (cannot('create', 'Invite')) {
          throw new UnauthorizedError(
            'Voce nao tem permissao para enviar convites.',
          )
        }

        const { email, role } = request.body

        // Separa o email em duas partes, separando pelo caractere '@'.
        const [, domain] = email.split('@')

        if (
          organization.shouldAttachUsersByDomain &&
          organization.domain === domain
        ) {
          throw new BadRequestError(
            `Usuários com domínio ${domain} ingressarão na sua organização automaticamente no login`,
          )
        }

        // Verifica se o convite ja foi enviado para esse e-mail
        const invitesWithSameEmail = await prisma.invite.findUnique({
          where: {
            email_organizationId: {
              email,
              organizationId: organization.id,
            },
          },
        })

        if (invitesWithSameEmail) {
          throw new BadRequestError('Já existe um convite para esse e-mail.')
        }

        // Verifica se o usuário ja possui uma membro na organização com o mesmo e-mail
        const membershipWithSameEmail = await prisma.member.findFirst({
          where: {
            organizationId: organization.id,
            user: {
              email,
            },
          },
        })

        if (membershipWithSameEmail) {
          throw new BadRequestError('Já existe um membro com esse e-mail.')
        }

        const invite = await prisma.invite.create({
          data: {
            organizationId: organization.id,
            email,
            role,
            authorId: userId,
          },
        })

        return reply.status(201).send({
          inviteId: invite.id,
          email,
        })
      },
    )
}
