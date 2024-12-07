import { ChevronDown, LogOut } from 'lucide-react'

import { auth } from '@/auth/auth'

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'

export async function ProfileButton() {
  const { user } = await auth()

  function getInitials(name: string): string {
    const initials = name
      .split(' ') // Divide o nome em palavras
      .map((word) => word.charAt(0).toUpperCase()) // Pega a primeira letra de cada palavra
      .slice(0, 2) // Mantém apenas as duas primeiras letras
      .join('')

    return initials
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-3 outline-none">
        <div className="flex flex-col items-end">
          <span className="text-sm font-bold">{user.name}</span>
          <span className="text-xs text-muted-foreground">{user.email}</span>
        </div>

        <Avatar className="size-8">
          {user.avatarUrl && <AvatarImage src={user.avatarUrl} />}
          {user.name && (
            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
          )}
        </Avatar>
        <ChevronDown className="size-4 text-muted-foreground" />
      </DropdownMenuTrigger>

      <DropdownMenuContent sideOffset={8} align="end">
        <DropdownMenuItem asChild className="cursor-pointer">
          <a href="/api/auth/sign-out">
            <LogOut className="mr-1 size-2" />
            Sair
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
