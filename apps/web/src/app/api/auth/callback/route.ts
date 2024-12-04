import { cookies } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'

import { signInWithGithub } from '@/http/auth/signInWithGithub'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams

  const code = searchParams.get('code')

  if (!code) {
    return NextResponse.json(
      { error: 'Código de autenticação não encontrado' },
      { status: 400 },
    )
  }

  const { token } = await signInWithGithub({ code })

  const coockieStore = await cookies()

  coockieStore.set('token', token, {
    path: '/',
    maxAge: 60 * 60 * 24, // 1 dia
  })

  // Redireciona para a home da aplicação
  const redirectUrl = request.nextUrl.clone()

  // Limpa o caminho da URL de redirecionamento para a home
  redirectUrl.pathname = '/'
  // Limpa os parâmetros da URL
  redirectUrl.search = ''

  return NextResponse.redirect(redirectUrl)
}
