import { env } from '@slave/env'
import { type CookiesFn, getCookie } from 'cookies-next'
import ky from 'ky'

export const api = ky.create({
  prefixUrl: env.NEXT_PUBLIC_API_URL,
  hooks: {
    // Executa antes de cada request
    beforeRequest: [
      async (request) => {
        let cookieStore: CookiesFn | undefined

        // Importando o next/headers apenas no lado do servidor
        if (typeof window === 'undefined') {
          const { cookies: serverCookies } = await import('next/headers')

          cookieStore = serverCookies
        }

        // Importando o cookies-next apenas no lado do cliente
        const token = await getCookie('token', { cookies: cookieStore })

        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`)
        }
      },
    ],
  },
})
