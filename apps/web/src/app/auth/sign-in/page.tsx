import { Mail } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

import githubIcon from '../../../assets/github-icon.svg'
import { signInWithEmailandPassword } from './actions'

export default function SignInPage() {
  return (
    <form action={signInWithEmailandPassword} className="space-y-4">
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

      <Button type="submit" className="w-full">
        <Mail className="mr-1 size-4" />
        Entrar com e-mail
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
