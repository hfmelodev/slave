import { KeyRound } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function ForgotPasswordPage() {
  return (
    <form action="" className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="email">Seu e-mail</Label>
        <Input id="email" name="email" type="email" />
      </div>

      <Button type="submit" className="w-full">
        <KeyRound className="mr-1 size-4" />
        Recuperar senha
      </Button>

      <Button variant="link" className="w-full" asChild size="sm">
        <Link href="/auth/sign-in">Voltar para login</Link>
      </Button>
    </form>
  )
}
