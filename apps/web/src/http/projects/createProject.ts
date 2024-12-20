import { api } from '../api-client'

interface CreateProjectRequest {
  org: string
  name: string
  description: string
}

type CreateProjectResponse = void
export async function createProject({
  org,
  name,
  description,
}: CreateProjectRequest) {
  return await api
    .post(`organizations/${org}/projects`, {
      json: {
        name,
        description,
      },
    })
    .json<CreateProjectResponse>()
}
