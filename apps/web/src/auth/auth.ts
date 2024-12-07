import { defineAbilityFor } from '@slave/auth'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { getProfile } from '@/http/auth/getProfile'
import { getMembership } from '@/http/org/getMembership'

export async function isAuthenticated() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value

  // Retorna um boolean indicando se o usuário está autenticado
  return !!token
}

export async function getCurrentOrg() {
  const cookieStore = await cookies()

  return cookieStore.get('org')?.value ?? null
}

// Busca os afiliados de uma organização
export async function getCurrentMembership() {
  const org = await getCurrentOrg()

  if (!org) {
    return null
  }

  const { membership } = await getMembership(org)

  return membership
}

// Busca as informações do usuário autenticado e quais permissões ele tem
export async function ability() {
  const membership = await getCurrentMembership()

  if (!membership) {
    return null
  }

  const ability = defineAbilityFor({
    id: membership.userId,
    role: membership.role,
  })

  return ability
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
