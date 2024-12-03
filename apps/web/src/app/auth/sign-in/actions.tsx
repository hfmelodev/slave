'use server'

import { HTTPError } from 'ky'
import { cookies } from 'next/headers'
import { z } from 'zod'

import { signInWithEmailAndPassword } from '@/http/auth/signInWithEmailAndPassword'

const signInSchema = z.object({
  email: z.string().email('Por favor, insira um e-mail válido.'),
  password: z.string().min(1, 'Por favor, insira uma senha.'),
})

export async function signInWithEmailandPasswordAction(
  // _: unknown, // previousState ou _: retorna o estado anterior do formulário
  data: FormData,
) {
  const result = signInSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { email, password } = result.data

  const cookieStore = await cookies()

  try {
    const { token } = await signInWithEmailAndPassword({
      email,
      password,
    })

    cookieStore.set('token', token, {
      path: '/',
      maxAge: 60 * 60 * 24, // 1 dia
    })
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json()

      return { success: false, message, errors: null }
    }

    console.error(err)

    return {
      success: false,
      message: 'Erro inesperado, tente novamente mais tarde.',
      errors: null,
    }
  }

  return { success: true, message: null, errors: null }
}
