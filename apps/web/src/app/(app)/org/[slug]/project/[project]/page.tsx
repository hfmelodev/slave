import { ChevronRight } from 'lucide-react'

import { Header } from '@/components/app/header'

export default async function Project() {
  return (
    <div className="space-y-4 py-4">
      <Header />

      <main className="mx-auto w-full max-w-[1200px]">
        <h1 className="mb-10 flex items-center gap-0.5 text-2xl font-bold tracking-tight">
          <ChevronRight className="size-6 text-border" />
          Criar projeto
        </h1>
      </main>
    </div>
  )
}
