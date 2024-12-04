'use server'

import { redirect } from 'next/navigation'

export async function signInWithGithub() {
  const githubSingInUrl = new URL('login/oauth/authorize', 'https://github.com')

  githubSingInUrl.searchParams.set('client_id', 'Ov23ctthuhqN5jAmAhWM')
  githubSingInUrl.searchParams.set(
    'redirect_uri',
    'http://localhost:3000/api/auth/callback',
  )
  githubSingInUrl.searchParams.set('scope', 'user')

  redirect(githubSingInUrl.toString())
}
