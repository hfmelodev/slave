import { Header } from '@/components/app/header'
import { Tabs } from '@/components/app/tabs'

export default async function OrgLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div>
      <div className="pt-4">
        <Header />
        <Tabs />
      </div>

      <main className="mx-auto w-full max-w-[1200px]">{children}</main>
    </div>
  )
}
