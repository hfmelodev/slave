import { redirect } from 'next/navigation'

import { isAuthenticated } from '@/auth/auth'
import { Header } from '@/components/app/header'

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Se o usuário estiver autenticado, redireciona para o login
  const authenticated = await isAuthenticated()

  if (!authenticated) {
    redirect('/auth/sign-in')
  }

  return (
    <div className="space-y-4 py-4">
      <Header />
      <main className="mx-auto w-full max-w-[1200px]">{children}</main>
    </div>
  )
}
