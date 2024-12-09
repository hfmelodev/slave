import { ChevronRight } from 'lucide-react'
import { redirect } from 'next/navigation'

import { ability } from '@/auth/auth'

import { ProjectForm } from './components/project-form'

export default async function CreateProject() {
  const permission = await ability()

  if (permission?.cannot('create', 'Project')) {
    redirect('/')
  }

  return (
    <div className="space-y-4 py-4">
      <h1 className="mb-10 flex items-center gap-0.5 text-2xl font-bold tracking-tight">
        <ChevronRight className="size-6 text-border" />
        Criar projeto
      </h1>

      <ProjectForm />
    </div>
  )
}
