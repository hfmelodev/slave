import { Header } from '@/components/app/header'

export default async function Home() {
  return (
    <div className="space-y-4 py-4">
      <Header />
      <main className="mx-auto w-full max-w-[1200px]">
        <p className="text-sm text-muted-foreground">
          Selecione uma organização.
        </p>
      </main>
    </div>
  )
}
