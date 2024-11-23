import { env } from '@slave/env'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { prisma } from '@/lib/prisma'

import { BadRequestError } from '../_errors/bad-request-error'

export async function authenticationWithGithub(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/sessions/github',
    {
      schema: {
        tags: ['auth'],
        summary: 'Autenticação com login social GitHub',
        body: z.object({
          code: z.string(),
        }),
      },
    },
    async (request, reply) => {
      // Extraímos o código de autenticação enviado no corpo da requisição
      const { code } = request.body

      // Criamos uma URL base para a API do GitHub que retorna o token de acesso OAuth
      const githubOAuthURL = new URL(
        'https://github.com/login/oauth/access_token',
      )

      // Adicionamos os parâmetros necessários para a requisição:
      // 1. `client_id`: Identificador único da aplicação no GitHub.
      // 2. `client_secret`: Chave secreta associada ao `client_id` para autenticação segura.
      // 3. `redirect_uri`: URL para onde o GitHub redireciona após a autenticação.
      // 4. `code`: Código temporário obtido após o login do usuário no GitHub.
      githubOAuthURL.searchParams.set('client_id', env.GITHUB_OAUTH_CLIENT_ID)
      githubOAuthURL.searchParams.set(
        'client_secret',
        env.GITHUB_OAUTH_CLIENT_SECRET,
      )
      githubOAuthURL.searchParams.set(
        'redirect_uri',
        env.GITHUB_OAUTH_CLIENT_REDIRECT_URI,
      )
      githubOAuthURL.searchParams.set('code', code)

      // Realizamos uma requisição POST à API do GitHub para obter o token de acesso.
      // Incluímos o cabeçalho `Accept: application/json` para que a resposta seja no formato JSON.
      const githubAccessTokenResponse = await fetch(githubOAuthURL, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
      })

      // Extraímos os dados da resposta em formato JSON, que conterá o token de acesso.
      // Este token pode ser usado posteriormente para realizar chamadas autenticadas à API do GitHub.
      const githubAccessTokenData = await githubAccessTokenResponse.json()

      // Extraímos e validamos os campos necessários da resposta da API do GitHub que retorna o token de acesso.
      // O schema verifica que:
      // - `access_token` é uma string,
      // - `token_type` é exatamente "bearer",
      // - `scope` é uma string.
      const { access_token: githubAccessToken } = z
        .object({
          access_token: z.string(),
          token_type: z.literal('bearer'),
          scope: z.string(),
        })
        .parse(githubAccessTokenData)

      // Fazemos uma requisição à API do GitHub para obter informações do usuário autenticado.
      // Usamos o token de acesso no cabeçalho `Authorization` no formato Bearer Token.
      const githubUserResponse = await fetch('https://api.github.com/user', {
        headers: {
          Authorization: `Bearer ${githubAccessToken}`,
        },
      })

      // Extraímos os dados do usuário da resposta da API.
      const githubUserData = await githubUserResponse.json()

      // Validamos e transformamos os dados recebidos do GitHub:
      // - `id`: Número inteiro transformado para string.
      // - `avatar_url`: URL válida para o avatar do usuário.
      // - `name` e `email`: Strings que podem ser nulas.
      const {
        id: githubId,
        name,
        email,
        avatar_url: avatarUrl,
      } = z
        .object({
          id: z.number().int().transform(String),
          avatar_url: z.string().url(),
          name: z.string().nullable(),
          email: z.string().nullable(),
        })
        .parse(githubUserData)

      // Se o e-mail do usuário for nulo, lançamos um erro, pois o e-mail é obrigatório para autenticação.
      if (email === null) {
        throw new BadRequestError(
          'Sua conta do GitHub deve ter um e-mail para autenticação.',
        )
      }

      // Verificamos se o usuário já existe no banco de dados com base no e-mail.
      let user = await prisma.user.findUnique({
        where: { email },
      })

      // Se o usuário não existir, criamos um novo registro com as informações obtidas do GitHub.
      if (!user) {
        user = await prisma.user.create({
          data: {
            email,
            name,
            avatarUrl,
          },
        })
      }

      // Verificamos se a conta GitHub já está associada a um usuário no banco.
      let account = await prisma.account.findUnique({
        where: {
          provider_userId: {
            provider: 'GITHUB',
            userId: user.id,
          },
        },
      })

      // Se a conta não existir, criamos um novo registro associando o usuário ao GitHub.
      if (!account) {
        account = await prisma.account.create({
          data: {
            provider: 'GITHUB',
            providerAccountId: githubId,
            userId: user.id,
          },
        })
      }

      const token = await reply.jwtSign(
        {
          sub: user.id, // Incluímos o ID do usuário como `sub` no payload.
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
