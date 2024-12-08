import { api } from '../api-client'

interface GetProjectsReponse {
  projects: {
    name: string
    id: string
    slug: string
    createdAt: string
    ownerId: string
    organizationId: string
    description: string
    avatarUrl?: string | null | undefined
    owner: {
      name: string | null
      id: string
      email: string
      avatarUrl?: string | null | undefined
    }
  }[]
}

export async function getProjects(org: string) {
  const result = await api
    .get(`organizations/${org}/projects`)
    .json<GetProjectsReponse>()

  return result
}
