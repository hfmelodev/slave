import { cookies } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  // Redireciona para a home da aplicação
  const redirectUrl = request.nextUrl.clone()

  // Redireciona para o login
  redirectUrl.pathname = '/auth/sign-in'

  const cookieStore = await cookies()
  cookieStore.delete('token')

  return NextResponse.redirect(redirectUrl)
}
