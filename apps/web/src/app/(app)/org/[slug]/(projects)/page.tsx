import { ChevronRight, Plus, X } from 'lucide-react'
import Link from 'next/link'

import { ability, getCurrentOrg } from '@/auth/auth'
import { Button } from '@/components/ui/button'

import { ProjectList } from './project-list'

export default async function Projects() {
  const currentOrg = await getCurrentOrg()

  const permissions = await ability()

  return (
    <div className="space-y-4 py-4">
      <div className="flex items-center justify-between">
        <h1 className="flex items-center gap-0.5 text-2xl font-bold tracking-tight">
          <ChevronRight className="size-6 text-border" />
          Projetos
        </h1>

        {permissions?.can('create', 'Project') && (
          <Button size="sm" asChild>
            <Link href={`/org/${currentOrg}/create-project`}>
              <Plus className="size-4" />
              Criar projeto
            </Link>
          </Button>
        )}
      </div>

      {permissions?.can('get', 'Project') ? (
        <ProjectList />
      ) : (
        <p className="inline-flex items-center gap-1 text-sm text-muted-foreground">
          <X className="size-6 text-rose-800" />
          Você não tem permissão para ver os projetos
        </p>
      )}
    </div>
  )
}
