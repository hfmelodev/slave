import { api } from '../api-client'

interface SignInWithEmailAndPasswordRequest {
  email: string
  password: string
}

interface SignInWithEmailAndPasswordResponse {
  token: string
}

export async function signInWithEmailAndPassword({
  email,
  password,
}: SignInWithEmailAndPasswordRequest) {
  return await api
    .post('sessions/password', {
      json: {
        email,
        password,
      },
    })
    .json<SignInWithEmailAndPasswordResponse>()
}
