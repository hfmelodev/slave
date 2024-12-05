'use server'

import { HTTPError } from 'ky'
import { z } from 'zod'

import { signUp } from '@/http/auth/signUp'

const singUpSchema = z
  .object({
    name: z.string().refine((value) => value.split(' ').length > 1, {
      message: 'Por favor, insira um nome completo.',
    }),
    email: z.string().email('Por favor, insira um e-mail válido.'),
    password: z
      .string()
      .min(6, 'Por favor, insira uma senha com pelo menos 6 caracteres.'),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'As senhas devem ser iguais.',
    path: ['password_confirmation'],
  })

export async function signUpAction(
  // _: unknown, // previousState ou _: retorna o estado anterior do formulário
  data: FormData,
) {
  const result = singUpSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { name, email, password } = result.data

  try {
    await signUp({
      name,
      email,
      password,
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
