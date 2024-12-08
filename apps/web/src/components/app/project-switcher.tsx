'use client'

import { useQuery } from '@tanstack/react-query'
import { ChevronsUpDown, PlusCircle } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

import { getProjects } from '@/http/projects/getProjects'

import { Avatar, AvatarFallback } from '../ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'

export function ProjectSwitcher() {
  const { slug: orgSlug } = useParams<{
    slug: string
  }>()

  const { data: projects, isLoading } = useQuery({
    queryKey: [orgSlug, 'projects'],
    queryFn: () => getProjects(orgSlug),
    // Só irá fazer a requisição se houver um slug de organização
    enabled: !!orgSlug,
  })

  console.log({ projects, isLoading })

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex w-auto items-center gap-2 rounded p-1 text-sm outline-none focus-visible:ring-2 focus-visible:ring-primary">
        {/* {currentOrganization ? (
          <>
            <Avatar className="mr-2 size-4">
              {currentOrganization.avatarUrl && (
                <AvatarImage src={currentOrganization.avatarUrl} />
              )}
              <AvatarFallback />
            </Avatar>
            <span className="line-clamp-1">{currentOrganization.name}</span>
          </>
        ) : ( */}
        <span className="text-muted-foreground">Selecionar projeto</span>
        {/* )} */}
        <ChevronsUpDown className="ml-auto size-4 text-muted-foreground" />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={12}
        alignOffset={-16}
        className="w-56"
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel>Organizações</DropdownMenuLabel>
          {/* {organizations.map((organization) => ( */}
          <DropdownMenuItem asChild>
            <Link href="">
              <Avatar className="mr-2 size-4">
                {/* {organization.avatarUrl && (
                  <AvatarImage src={organization.avatarUrl} />
                )} */}
                <AvatarFallback />
              </Avatar>
              <span className="line-clamp-1">Projeto Nasa</span>
            </Link>
          </DropdownMenuItem>
          {/* ))} */}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href="/create-project">
            <PlusCircle className="mr-2 size-4" />
            Criar novo projeto
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
