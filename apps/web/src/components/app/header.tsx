import { Blocks, Slash } from 'lucide-react'
import Link from 'next/link'

import { ability } from '@/auth/auth'

import { ThemeSwitcher } from '../theme/theme-switcher'
import { Separator } from '../ui/separator'
import { OrganizationSwitcher } from './organization-switcher'
import { ProfileButton } from './profile-button'
import { ProjectSwitcher } from './project-switcher'

export async function Header() {
  const permission = await ability()

  return (
    <div className="mx-auto flex max-w-[1200px] items-center justify-between border-b pb-3">
      <div className="flex items-center gap-3">
        <Link href="/">
          <Blocks className="size-6 text-primary dark:text-primary/70" />
        </Link>

        <Slash className="size-3 -rotate-[26deg] text-border" />

        <OrganizationSwitcher />

        {permission?.can('get', 'Project') && (
          <>
            <Slash className="size-3 -rotate-[26deg] text-border" />
            <ProjectSwitcher />
          </>
        )}
      </div>

      <div className="flex items-center gap-4">
        <ThemeSwitcher />
        <Separator orientation="vertical" className="h-5" />
        <ProfileButton />
      </div>
    </div>
  )
}
