import { XCircle } from 'lucide-react'
import { redirect } from 'next/navigation'

import { getCurrentOrg } from '@/auth/auth'
import { Button } from '@/components/ui/button'
import { shutdownOrganization } from '@/http/org/shutdownOrganization'

export async function ShutdownOrganization() {
  async function handleShutdownOrganization() {
    'use server'

    const currentOrg = await getCurrentOrg()

    await shutdownOrganization({
      org: currentOrg!,
    })

    redirect('/')
  }
  return (
    <form action={handleShutdownOrganization} className="text-center">
      <Button type="submit" variant="destructive" className="w-1/2">
        <XCircle className="size-4" />
        Encerrar organização
      </Button>
    </form>
  )
}
