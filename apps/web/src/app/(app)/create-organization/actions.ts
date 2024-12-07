'use server'

import { HTTPError } from 'ky'
import { z } from 'zod'

import { createOrganization } from '@/http/org/createOrganization'

const organizationSchema = z
  .object({
    name: z
      .string()
      .min(4, 'O nome da organização deve ter pelo menos 4 caracteres.'),
    domain: z
      .string()
      .nullable()
      .refine((value) => {
        if (value) {
          const domainRegex =
            /^([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/

          return domainRegex.test(value)
        }

        return true
      }, 'Por favor, insira um domínio valido.'),
    shouldAttachUsersByDomain: z
      .union([z.literal('on'), z.literal('off'), z.boolean()])
      .transform((value) => value === true || value === 'on')
      .default(false),
  })
  .refine(
    (data) => {
      if (data.shouldAttachUsersByDomain === true && !data.domain) {
        return false
      }

      return true
    },
    {
      message:
        'O domínio é necessário quando a adesão automática está habilitada.',
      path: ['domain'],
    },
  )

export async function createOrganizationAction(
  // _: unknown, // previousState ou _: retorna o estado anterior do formulário
  data: FormData,
) {
  const result = organizationSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { name, domain, shouldAttachUsersByDomain } = result.data

  try {
    await createOrganization({
      name,
      domain,
      shouldAttachUsersByDomain,
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
    message: 'A organização foi salva com sucesso.',
    errors: null,
  }
}
