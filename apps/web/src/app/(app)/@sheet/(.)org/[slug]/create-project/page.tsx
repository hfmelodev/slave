import { ProjectForm } from '@/app/(app)/org/[slug]/create-project/components/project-form'
import { InterceptedSheetContent } from '@/components/app/intercepted-sheet-content'
import { Sheet, SheetHeader, SheetTitle } from '@/components/ui/sheet'

export default function CreateProject() {
  return (
    <Sheet defaultOpen>
      <InterceptedSheetContent>
        <SheetHeader>
          <SheetTitle>Criar projeto</SheetTitle>
        </SheetHeader>

        <div className="w-full py-4">
          <ProjectForm />
        </div>
      </InterceptedSheetContent>
    </Sheet>
  )
}
