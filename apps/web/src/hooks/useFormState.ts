import { useState, useTransition } from 'react'
import { requestFormReset } from 'react-dom'

interface FormState {
  success: boolean
  message: string | null
  errors: Record<string, string[]> | null
}

export function useFormState(
  action: (data: FormData) => Promise<FormState>,
  onSuccess?: () => Promise<void> | void,
  initialState?: FormState,
) {
  const [isPending, startTransition] = useTransition()

  // Guardando o estado do formulário em uma variável
  const [formState, setFormState] = useState(
    initialState ?? {
      success: false,
      message: null,
      errors: null,
    },
  )

  // Função para lidar com o envio do formulário e atualizar o estado
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    // Busca os dados do formulário no corpo da requisição
    const form = event.currentTarget
    const formData = new FormData(form)

    // Chama a função de autenticação com os dados do formulário e inicia a transição de estado
    startTransition(async () => {
      const state = await action(formData)

      if (state.success && onSuccess) {
        await onSuccess()
      }

      setFormState(state)

      // Garantir que requestFormReset esteja em um escopo sincronizado
      startTransition(() => {
        requestFormReset(form)
      })
    })
  }

  // as const significa que essa função retorna um array com 3 elementos na ordem
  // [formState, handleSubmit, isPending]
  return [formState, handleSubmit, isPending] as const
}
