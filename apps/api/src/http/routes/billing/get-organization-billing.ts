import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { getUserPermission } from '@/utils/get-user-permission'

import { UnauthorizedError } from '../_errors/unauthorized-error'

export async function getOrganizationBilling(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/organizations/:slug/billing',
      {
        schema: {
          tags: ['billing'],
          summary: 'Busca as informações de cobrança de uma organização',
          security: [{ bearerAuth: [] }],
          params: z.object({
            slug: z.string(),
          }),
          response: {
            200: z.object({
              billing: z.object({
                seats: z.object({
                  amount: z.number(),
                  unit: z.number(),
                  price: z.number(),
                }),
                projects: z.object({
                  amount: z.number(),
                  unit: z.number(),
                  price: z.number(),
                }),
                total: z.number(),
              }),
            }),
          },
        },
      },
      async (request) => {
        const { slug } = request.params

        const userId = await request.getCurrentUserId()

        const { organization, membership } =
          await request.getUserMembership(slug)

        const { cannot } = getUserPermission(userId, membership.role)

        if (cannot('get', 'Billing')) {
          throw new UnauthorizedError(
            'Vocês não podem ver as informações de cobrança dessa organização.',
          )
        }

        // Busca quantos membros e quantos projetos a organização possui
        const [amountOfMembers, amountOfProjects] = await Promise.all([
          prisma.member.count({
            where: {
              organizationId: organization.id,
              role: { not: 'BILLING' },
            },
          }),

          prisma.project.count({
            where: {
              organizationId: organization.id,
            },
          }),
        ])

        return {
          billing: {
            seats: {
              amount: amountOfMembers,
              unit: 10,
              price: amountOfMembers * 10,
            },
            projects: {
              amount: amountOfProjects,
              unit: 20,
              price: amountOfProjects * 20,
            },
            total: amountOfMembers * 10 + amountOfProjects * 20,
          },
        }
      },
    )
}
