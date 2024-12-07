'use server'

import { env } from '@slave/env'
import { redirect } from 'next/navigation'

export async function signInWithGithub() {
  const githubSingInUrl = new URL('login/oauth/authorize', 'https://github.com')

  githubSingInUrl.searchParams.set('client_id', env.GITHUB_OAUTH_CLIENT_ID)
  githubSingInUrl.searchParams.set(
    'redirect_uri',
    env.GITHUB_OAUTH_CLIENT_REDIRECT_URI,
  )
  githubSingInUrl.searchParams.set('scope', 'user')

  redirect(githubSingInUrl.toString())
}
