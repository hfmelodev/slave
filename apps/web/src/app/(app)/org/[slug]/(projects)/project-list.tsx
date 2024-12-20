import { ArrowRight } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export function ProjectList() {
  return (
    <div className="grid grid-cols-3 flex-wrap gap-4">
      {Array.from({ length: 6 }).map((_, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle>Projeto 1</CardTitle>
            <CardDescription className="line-clamp-2 leading-relaxed">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Similique, amet numquam nemo aspernatur ducimus dolorem
              consequatur sapiente nesciunt earum quia quisquam et dolore
              expedita repellat, facilis obcaecati culpa neque! Ipsum?
            </CardDescription>
          </CardHeader>

          <CardFooter className="flex items-start gap-1.5">
            <Avatar className="size-4">
              <AvatarImage src="https://github.com/hfmelodev.png" />
              <AvatarFallback />
            </Avatar>

            <div className="flex flex-col gap-1">
              <span className="text-xs text-muted-foreground">
                Criado por{' '}
                <span className="font-medium text-foreground">
                  Benjamin Sousa Melo
                </span>{' '}
              </span>

              <span className="text-xs italic text-muted-foreground">
                há 2 dias atrás
              </span>
            </div>

            <Button size="xs" className="ml-auto">
              Visualizar
              <ArrowRight className="size-1" />
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
