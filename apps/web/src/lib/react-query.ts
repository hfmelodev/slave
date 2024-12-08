import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    // Significa que as consultas são refeitas sempre que o cache for limpo
    queries: {
      // Significa que as queries serão refeitas sempre que a janela perder o foco
      refetchOnWindowFocus: false,
    },
  },
})
