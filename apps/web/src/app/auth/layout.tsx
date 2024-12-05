import { redirect } from 'next/navigation'

import { isAuthenticated } from '@/auth/auth'

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Se o usuário estiver autenticado, redireciona para a home
  if (await isAuthenticated()) {
    redirect('/')
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="w-full max-w-md">{children}</div>
    </div>
  )
}
