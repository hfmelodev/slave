import { cookies } from 'next/headers'

export async function isAuthenticated() {
  const cookieStore = await cookies()

  // Verifica se o usuário está autenticado
  const token = cookieStore.get('token')?.value

  return !!token
}
