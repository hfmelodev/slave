import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { getProfile } from '@/http/auth/getProfile'

export async function isAuthenticated() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value

  // Retorna um boolean indicando se o usuário está autenticado
  return !!token
}

export async function auth() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value

  if (!token) {
    redirect('/auth/sign-in')
  }

  try {
    const { user } = await getProfile()

    return { user }
  } catch (err) {
    console.log(err)
  }

  redirect('api/auth/sign-out')
}
