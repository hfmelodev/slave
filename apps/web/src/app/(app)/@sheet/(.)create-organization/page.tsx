import { InterceptedSheetContent } from '@/components/app/intercepted-sheet-content'
import { Sheet, SheetHeader, SheetTitle } from '@/components/ui/sheet'

import { OrganizationForm } from '../../org/components/organization-form'

export default function CreateOrganization() {
  return (
    <Sheet defaultOpen>
      <InterceptedSheetContent>
        <SheetHeader>
          <SheetTitle>Criar organização</SheetTitle>
        </SheetHeader>

        <div className="w-full py-4">
          <OrganizationForm />
        </div>
      </InterceptedSheetContent>
    </Sheet>
  )
}
