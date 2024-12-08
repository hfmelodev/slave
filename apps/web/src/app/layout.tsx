import './globals.css'

import type { Metadata } from 'next'

import { Providers } from './(app)/providers'

export const metadata: Metadata = {
  title: 'Slave Next.js SaaS + RBAC',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
