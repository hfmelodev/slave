import { Blocks, Slash } from 'lucide-react'

import { ability } from '@/auth/auth'

import { ThemeSwitcher } from '../theme/theme-switcher'
import { Separator } from '../ui/separator'
import { OrganizationSwitcher } from './organization-switcher'
import { ProfileButton } from './profile-button'

export async function Header() {
  const permission = await ability()

  return (
    <div className="mx-auto flex max-w-[1200px] items-center justify-between">
      <div className="flex items-center gap-3">
        <Blocks className="size-6" />

        <Slash className="size-3 -rotate-[26deg] text-border" />

        <OrganizationSwitcher />

        {permission?.can('get', 'Project') && <p>Projetos</p>}
      </div>

      <div className="flex items-center gap-4">
        <ThemeSwitcher />
        <Separator orientation="vertical" className="h-5" />
        <ProfileButton />
      </div>
    </div>
  )
}
