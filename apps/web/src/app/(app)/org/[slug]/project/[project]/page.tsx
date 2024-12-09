import { ChevronRight } from 'lucide-react'

export default async function Project() {
  return (
    <div className="space-y-4 py-4">
      <h1 className="mb-10 flex items-center gap-0.5 text-2xl font-bold tracking-tight">
        <ChevronRight className="size-6 text-border" />
        Meu projeto
      </h1>
    </div>
  )
}
