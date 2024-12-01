'use client'

import { Loader2, Mail } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useActionState } from 'react'

import githubIcon from '@/assets/github-icon.svg'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

import { signInWithEmailandPasswordAction } from '../actions'

export function SignInForm() {
  const [state, formAction, isPending] = useActionState(
    signInWithEmailandPasswordAction,
    null,
  )

  return (
    <form action={formAction} className="space-y-4">
      <h1>{state}</h1>

      <div className="space-y-1">
        <Label htmlFor="email">Seu melhor e-mail</Label>
        <Input id="email" name="email" type="email" />
      </div>

      <div className="space-y-1">
        <Label htmlFor="password">Sua senha</Label>
        <Input id="password" name="password" type="password" />

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
