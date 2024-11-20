import { AbilityBuilder } from '@casl/ability'

// Importa o tipo da habilidade principal da aplicação
import { AppAbility } from '.'
// Importa o tipo do usuário
import type { User } from './models/user'
// Importa o tipo de papel (role) do usuário
import type { Role } from './roles'

// Define o tipo de função que mapeia permissões com base no papel do usuário
type PermissionsByRole = (
  user: User, // Dados do usuário atual
  builder: AbilityBuilder<AppAbility>, // Builder para configurar habilidades
) => void

// Define um objeto que mapeia papéis (roles) para suas respectivas permissões
export const permissions: Record<Role, PermissionsByRole> = {
  // Permissões para o papel ADMIN
  ADMIN(user, { can, cannot }) {
    can('manage', 'all') // ADMIN pode gerenciar tudo

    // ADMIN não pode transferir propriedade ou atualizar organizações que não são dele
    cannot(['transfer_ownership', 'update'], 'Organization')
    can(['transfer_ownership', 'update'], 'Organization', {
      ownerId: { $eq: user.id }, // Pode apenas em organizações onde é proprietário
    })
  },

  // Permissões para o papel MEMBER
  MEMBER(user, { can }) {
    can('get', 'User') // Pode consultar usuários
    can(['create', 'get'], 'Project') // Pode criar e consultar projetos
    can(['update', 'delete'], 'Project', {
      ownerId: { $eq: user.id }, // Pode atualizar ou deletar projetos que ele próprio criou
    })
  },

  // Permissões para o papel BILLING
  BILLING(_, { can }) {
    can('manage', 'Billing') // Pode gerenciar aspectos relacionados a cobrança
  },
}
