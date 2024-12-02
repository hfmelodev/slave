'use client'

import { AlertTriangle, Loader2, Mail } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useTransition } from 'react'

// import { useActionState } from 'react'
import githubIcon from '@/assets/github-icon.svg'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

import { signInWithEmailandPasswordAction } from '../actions'

export function SignInForm() {
  // const [{ success, message, errors }, formAction, isPending] = useActionState(
  //   signInWithEmailandPasswordAction,
  //   { success: false, message: null, errors: null },
  // )

  const [isPending, startTransition] = useTransition()

  // Guardando o estado do formulário em uma variável
  const [{ success, message, errors }, setFormState] = useState<{
    success: boolean
    message: string | null
    errors: Record<string, string[]> | null
  }>({ success: false, message: null, errors: null })

  async function handleSignIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    // Busca os dados do formulário no corpo da requisição
    const formData = new FormData(event.currentTarget)

    // Chama a função de autenticação com os dados do formulário e inicia a transição de estado
    startTransition(async () => {
      const state = await signInWithEmailandPasswordAction(formData)

      // Atualiza o estado do formulário
      setFormState(state)
    })
  }

  return (
    <form onSubmit={handleSignIn} className="space-y-4">
      {success === false && message && (
        <Alert variant="destructive">
          <AlertTriangle className="size-4" />
          <AlertTitle>Login falhou!</AlertTitle>
          <AlertDescription>
            <p>{message}</p>
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-1">
        <Label htmlFor="email">Seu melhor e-mail</Label>
        <Input id="email" name="email" type="email" />

        {/* Dispara uma mensagem de erro se o campo for inválido */}
        {errors?.email && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.email}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="password">Sua senha</Label>
        <Input id="password" name="password" type="password" />

        {/* Dispara uma mensagem de erro se o campo for inválido */}
        {errors?.password && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.password}
          </p>
        )}

        <Link
          href="/auth/forgot-password"
          className="text-xs font-medium text-muted-foreground hover:underline"
        >
          Esqueceu sua senha?
        </Link>
      </div>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <>
            <Mail className="mr-1 size-4" />
            Entrar com e-mail
          </>
        )}
      </Button>

      <Button variant="link" className="w-full" asChild size="sm">
        <Link href="/auth/sign-up">Criar uma conta</Link>
      </Button>

      <Separator />

      <Button type="submit" variant="outline" className="w-full">
        <Image src={githubIcon} alt="" className="mr-1 size-4 dark:invert" />
        Entrar com GitHub
      </Button>
    </form>
  )
}
