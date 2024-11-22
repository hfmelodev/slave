import { compare } from 'bcryptjs'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { BadRequestError } from '@/http/routes/_errors/bad-request-error'
import { prisma } from '@/lib/prisma'

export async function authenticationWithPassword(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/sessions/password',
    {
      schema: {
        tags: ['auth'],
        summary: 'Autenticação com e-mail e senha',
        body: z.object({
          email: z.string().email(),
          password: z.string(),
        }),
        response: {
          201: z.object({
            token: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { email, password } = request.body

      const userFromEmail = await prisma.user.findUnique({
        where: {
          email,
        },
      })

      if (!userFromEmail) {
        throw new BadRequestError('Credenciais inválidas.')
      }

      if (userFromEmail.passwordHash === null) {
        throw new BadRequestError(
          'Seu usuário não possui uma senha, utilize o login social.',
        )
      }

      const isPasswordValid = await compare(
        password,
        userFromEmail.passwordHash,
      )

      if (!isPasswordValid) {
        throw new BadRequestError('Credenciais inválidas.')
      }

      /**
       * Gerando o Token JWT
       */
      const token = await reply.jwtSign(
        {
          sub: userFromEmail.id, // Adicionado o Id do usuário no payload
        },
        {
          sign: {
            expiresIn: '1d',
          },
        },
      )

      return reply.status(201).send({ token })
    },
  )
}
