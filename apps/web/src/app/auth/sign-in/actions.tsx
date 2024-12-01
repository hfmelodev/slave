'use server'

import { signInWithEmailAndPassword } from '@/http/auth/signInWithEmailAndPassword'

export async function signInWithEmailandPasswordAction(
  previousState: unknown, // previousState: retorna o estado anterior do formulário
  data: FormData,
) {
  console.log(previousState)

  const { email, password } = Object.fromEntries(data)

  // Simulando um delay de 2 segundos
  await new Promise((resolve) => setTimeout(resolve, 2000))

  const response = await signInWithEmailAndPassword({
    email: String(email),
    password: String(password),
  })

  console.log(response)

  return 'Sucesso!'
}
