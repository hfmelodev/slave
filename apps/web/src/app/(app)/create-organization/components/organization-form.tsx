'use client'

import { AlertTriangle, CheckCheck, Loader2, Save } from 'lucide-react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormState } from '@/hooks/useFormState'

import { createOrganizationAction } from '../actions'

export function OrganizationForm() {
  const [{ success, message, errors }, handleSubmit, isPending] = useFormState(
    createOrganizationAction,
  )

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex max-w-2xl flex-col space-y-4"
    >
      {success === false && message && (
        <Alert variant="destructive">
          <AlertTriangle className="size-4" />
          <AlertTitle>Houve um erro ao criar a organização!</AlertTitle>
          <AlertDescription>
            <p>{message}</p>
          </AlertDescription>
        </Alert>
      )}

      {success === true && message && (
        <Alert variant="success">
          <CheckCheck className="size-4" />
          <AlertTitle>Parabéns! 🥳</AlertTitle>
          <AlertDescription>
            <p>{message}</p>
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-1">
        <Label htmlFor="name">Defina um nome</Label>
        <Input id="name" name="name" type="text" />

        {errors?.name && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.name[0]}
          </p>
        )}
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

        {errors?.domain && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.domain[0]}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <div className="flex flex-col space-y-1">
          <div className="flex items-center space-x-2">
            <Checkbox
              name="shouldAttachUsersByDomain"
              id="shouldAttachUsersByDomain"
            />
            <label htmlFor="shouldAttachUsersByDomain" className="space-y-1">
              <span className="text-sm font-medium leading-none">
                Ingressar automaticamente novos membros por domínio
              </span>
            </label>
          </div>

          <p className="ml-6 text-[13px] text-muted-foreground">
            Isso convidará automaticamente todos os membros com o mesmo domínio
            de e-mail para esta organização.
          </p>
        </div>

        {errors?.shouldAttachUsersByDomain && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.shouldAttachUsersByDomain[0]}
          </p>
        )}
      </div>

      <Button type="submit" className="w-full font-bold" disabled={isPending}>
        {isPending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <>
            <Save className="mr-1 size-4" />
            Salvar organização
          </>
        )}
      </Button>
    </form>
  )
}
