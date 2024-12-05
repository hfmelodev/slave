'use client'

import { AlertTriangle, Loader2, UserPlus } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import githubIcon from '@/assets/github-icon.svg'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useFormState } from '@/hooks/useFormState'

import { signInWithGithub } from '../../actions'
import { signUpAction } from '../actions'
export function SignOutForm() {
  const router = useRouter()

  const [{ success, message, errors }, handleSubmit, isPending] = useFormState(
    signUpAction,
    // Direciona o usuário para o login após o envio do formulário com sucesso
    () => {
      router.push('/auth/sign-in')
    },
  )

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        {success === false && message && (
          <Alert variant="destructive">
            <AlertTriangle className="size-4" />
            <AlertTitle>Houve um erro ao criar sua conta!</AlertTitle>
            <AlertDescription>
              <p>{message}</p>
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-1">
          <Label htmlFor="name">Nome completo</Label>
          <Input id="name" name="name" type="text" />

          {/* Dispara uma mensagem de erro se o campo for inválido */}
          {errors?.name && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {errors.name[0]}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="email">Seu melhor e-mail</Label>
          <Input id="email" name="email" type="email" />

          {/* Dispara uma mensagem de erro se o campo for inválido */}
          {errors?.email && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {errors.email[0]}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="password">Sua senha</Label>
          <Input id="password" name="password" type="password" />

          {/* Dispara uma mensagem de erro se o campo for inválido */}
          {errors?.password && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {errors.password[0]}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="password_confirmation">Confirme sua senha</Label>
          <Input
            id="password_confirmation"
            name="password_confirmation"
            type="password"
          />

          {/* Dispara uma mensagem de erro se o campo for inválido */}
          {errors?.password_confirmation && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {errors.password_confirmation[0]}
            </p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <>
              <UserPlus className="mr-1 size-4" />
              Criar conta
            </>
          )}
        </Button>

        <Button variant="link" className="w-full" asChild size="sm">
          <Link href="/auth/sign-in">Já possue uma conta? Entrar</Link>
        </Button>
      </form>

      <Separator />

      <form action={signInWithGithub}>
        <Button type="submit" variant="outline" className="w-full">
          <Image src={githubIcon} alt="" className="mr-1 size-4 dark:invert" />
          Criar conta com GitHub
        </Button>
      </form>
    </div>
  )
}
