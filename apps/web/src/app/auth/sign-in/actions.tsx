'use server'

import { signInWithEmailAndPassword } from '@/http/auth/signInWithEmailAndPassword'

export async function signInWithEmailandPassword(data: FormData) {
  const { email, password } = Object.fromEntries(data)

  const response = await signInWithEmailAndPassword({
    email: String(email),
    password: String(password),
  })

  console.log(response)
}
