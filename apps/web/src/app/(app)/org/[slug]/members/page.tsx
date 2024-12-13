import { ChevronRight } from 'lucide-react'

import { ability } from '@/auth/auth'

import { Invites } from './invites'
import { MemberList } from './member-list'

export default async function MembersPage() {
  const permission = await ability()

  return (
    <div className="space-y-4 py-4">
      <h1 className="mb-10 flex items-center gap-0.5 text-2xl font-bold tracking-tight">
        <ChevronRight className="size-6 text-border" />
        Membros
      </h1>

      <div className="space-y-4">
        {permission?.can('get', 'Invite') && <Invites />}
        {permission?.can('get', 'User') && <MemberList />}
      </div>
    </div>
  )
}
