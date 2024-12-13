import { ChevronRight } from 'lucide-react'

import { OrganizationForm } from '@/app/(app)/org/components/organization-form'
import { ability, getCurrentOrg } from '@/auth/auth'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { getOrganization } from '@/http/org/getOrganization'

import { Billing } from './components/billing'
import { ShutdownOrganization } from './components/shutdown-organization'

export default async function Settings() {
  const currentOrg = await getCurrentOrg()
  const permissions = await ability()

  const canUpdateOrganization = permissions?.can('update', 'Organization')
  const canGetBilling = permissions?.can('get', 'Billing')
  const canShutdownOrganization = permissions?.can('delete', 'Organization')

  const { organization } = await getOrganization(currentOrg!)

  return (
    <div className="space-y-4 py-4">
      <h1 className="mb-10 flex items-center gap-0.5 text-2xl font-bold tracking-tight">
        <ChevronRight className="size-6 text-border" />
        Configurações
      </h1>

      <div className="mx-auto max-w-3xl space-y-4">
        {canUpdateOrganization && (
          <Card className="mx-auto flex flex-col space-y-4">
            <CardHeader>
              <CardTitle>Configurações da Organização</CardTitle>
              <CardDescription>
                Atualize os detalhes da sua organização
              </CardDescription>
            </CardHeader>

            <CardContent>
              <OrganizationForm
                isUpdating
                initialData={{
                  name: organization.name,
                  domain: organization.domain,
                  shouldAttachUsersByDomain:
                    organization.shouldAttachUsersByDomain,
                }}
              />
            </CardContent>
          </Card>
        )}

        {canGetBilling && <Billing />}

        {canShutdownOrganization && (
          <Card className="mx-auto flex flex-col space-y-4">
            <CardHeader>
              <CardTitle>Deletar Organização</CardTitle>
              <CardDescription>
                Isso excluirá todos os dados da organização, incluindo todos os
                projetos. Você não pode desfazer esta ação.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <ShutdownOrganization />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
