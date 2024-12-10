import { ChevronRight } from 'lucide-react'

import { OrganizationForm } from '@/app/(app)/org/components/organization-form'
import { ability } from '@/auth/auth'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { ShutdownOrganization } from './components/shutdown-organization'

export default async function Settings() {
  const permissions = await ability()

  const canUpdateOrganization = permissions?.can('update', 'Organization')
  const canGetBilling = permissions?.can('get', 'Billing')
  const canShutdownOrganization = permissions?.can('delete', 'Organization')

  return (
    <div className="space-y-4 py-4">
      <h1 className="mb-10 flex items-center gap-0.5 text-2xl font-bold tracking-tight">
        <ChevronRight className="size-6 text-border" />
        Configurações
      </h1>

      <div className="space-y-4">
        {canUpdateOrganization && (
          <Card className="mx-auto flex flex-col space-y-4">
            <CardHeader>
              <CardTitle>Configurações da Organização</CardTitle>
              <CardDescription>
                Atualize os detalhes da sua organização
              </CardDescription>
            </CardHeader>

            <CardContent>
              <OrganizationForm />
            </CardContent>
          </Card>
        )}

        {canGetBilling && (
          <Card className="mx-auto flex flex-col space-y-4">
            <CardHeader>
              <CardTitle>Configurações de cobrança</CardTitle>
              <CardDescription>
                Atualize os detalhes de cobrança da sua organização
              </CardDescription>
            </CardHeader>
          </Card>
        )}

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
