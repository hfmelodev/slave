// import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default async function CreateOrganization() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Criar organização</h1>

      <form className="space-y-4">
        <div className="space-y-1">
          <Label htmlFor="name">Defina um nome</Label>
          <Input id="name" name="name" type="text" />
        </div>

        <div className="space-y-1">
          <Label htmlFor="domain">Defina um domínio</Label>
          <Input
            id="domain"
            name="domain"
            type="text"
            inputMode="url"
            placeholder="acme.com"
          />
        </div>

        <div className="space-y-1">
          <div className="flex items-center space-x-3">
            <Checkbox
              name="shouldAttachUsersByDomain"
              id="shouldAttachUsersByDomain"
            />
            <label htmlFor="shouldAttachUsersByDomain" className="space-y-1">
              <span className="text-sm font-medium leading-none">
                Ingressar automaticamente novos membros por domínio
              </span>
              <p className="text-sm text-muted-foreground">
                Isso convidará automaticamente todos os membros com o mesmo
                domínio de e-mail para esta organização.
              </p>
            </label>
          </div>
        </div>

        <Button type="submit" className="w-full font-bold">
          Salvar organização
        </Button>
      </form>
    </div>
  )
}
