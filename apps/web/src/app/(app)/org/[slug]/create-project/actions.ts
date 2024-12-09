'use server'

import { HTTPError } from 'ky'
import { z } from 'zod'

import { getCurrentOrg } from '@/auth/auth'
import { createProject } from '@/http/projects/createProject'

const projectSchema = z.object({
  name: z
    .string()
    .min(4, 'O nome do projeto deve ter pelo menos 4 caracteres.'),
  description: z.string(),
})
export async function createProjectAction(data: FormData) {
  const result = projectSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { name, description } = result.data

  const orgSlug = await getCurrentOrg()

  try {
    await createProject({
      org: orgSlug!,
      name,
      description,
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

  return {
    success: true,
    message: 'O projeto foi salvo com sucesso.',
    errors: null,
  }
}
