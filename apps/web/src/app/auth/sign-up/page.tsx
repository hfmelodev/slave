import { UserPlus } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

import githubIcon from '../../../assets/github-icon.svg'

export default function SignUpPage() {
  return (
    <form action="" className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="name">Nome completo</Label>
        <Input id="name" name="name" type="text" />
      </div>

      <div className="space-y-1">
        <Label htmlFor="email">Seu melhor e-mail</Label>
        <Input id="email" name="email" type="email" />
      </div>

      <div className="space-y-1">
        <Label htmlFor="password">Sua senha</Label>
        <Input id="password" name="password" type="password" />
      </div>

      <div className="space-y-1">
        <Label htmlFor="password_confirmation">Confirme sua senha</Label>
        <Input
          id="password_confirmation"
          name="password_confirmation"
          type="password"
        />
      </div>

      <Button type="submit" className="w-full">
        <UserPlus className="mr-1 size-4" />
        Criar conta
      </Button>

      <Button variant="link" className="w-full" asChild size="sm">
        <Link href="/auth/sign-in">Já possue uma conta? Entrar</Link>
      </Button>

      <Separator />

      <Button type="submit" variant="outline" className="w-full">
        <Image src={githubIcon} alt="" className="mr-1 size-4 dark:invert" />
        Criar com GitHub
      </Button>
    </form>
  )
}
