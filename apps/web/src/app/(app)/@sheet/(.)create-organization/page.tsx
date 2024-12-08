import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'

import { OrganizationForm } from '../../create-organization/components/organization-form'

export default function CreateOrganization() {
  return (
    <Sheet defaultOpen>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Criar organização</SheetTitle>
        </SheetHeader>

        <div className="w-full py-4">
          <OrganizationForm />
        </div>
      </SheetContent>
    </Sheet>
  )
}
