'use client'

import { useQuery } from '@tanstack/react-query'
import { ChevronsUpDown, PlusCircle } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

import { getProjects } from '@/http/projects/getProjects'

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Skeleton } from '../ui/skeleton'

export function ProjectSwitcher() {
  const { slug: orgSlug, project: projectSlug } = useParams<{
    slug: string
    project: string
  }>()

  const { data, isLoading } = useQuery({
    queryKey: [orgSlug, 'projects'],
    queryFn: () => getProjects(orgSlug),
    // Só irá fazer a requisição se houver um slug de organização
    enabled: !!orgSlug,
  })

  const currentProject =
    data && projectSlug
      ? data.projects.find((project) => project.slug === projectSlug)
      : null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex w-auto items-center gap-2 rounded p-1 text-sm outline-none transition-all focus-visible:ring-2 focus-visible:ring-primary">
        {isLoading ? (
          <>
            <Skeleton className="h-4 w-4 animate-spin rounded-full border-b-2 border-current" />
            <Skeleton className="h-4 w-40 flex-1 rounded-full" />
          </>
        ) : (
          <>
            {currentProject ? (
              <>
                <Avatar className="size-4">
                  {currentProject.avatarUrl && (
                    <AvatarImage src={currentProject.avatarUrl} />
                  )}
                  <AvatarFallback />
                </Avatar>
                <span className="line-clamp-1 font-medium">
                  {currentProject.name}
                </span>
              </>
            ) : (
              <span className="text-muted-foreground">Selecionar projeto</span>
            )}
          </>
        )}
        {isLoading ? null : <ChevronsUpDown className="ml-auto size-4" />}
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={12}
        alignOffset={-16}
        className="w-56"
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel>Projetos</DropdownMenuLabel>
          {data &&
            data.projects.map((project) => (
              <DropdownMenuItem key={project.id} asChild>
                <Link href={`/org/${orgSlug}/project/${project.slug}`}>
                  <Avatar className="mr-2 size-4">
                    {project.avatarUrl && (
                      <AvatarImage src={project.avatarUrl} />
                    )}
                    <AvatarFallback />
                  </Avatar>
                  <span className="line-clamp-1">{project.name}</span>
                </Link>
              </DropdownMenuItem>
            ))}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href={`/org/${orgSlug}/create-project`}>
            <PlusCircle className="mr-2 size-4" />
            Criar novo projeto
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
