// Importa módulos e funções da biblioteca @casl/ability para gerenciar permissões baseadas em habilidades
import {
  AbilityBuilder, // Facilita a criação de definições de habilidade
  CreateAbility, // Tipo para criar uma habilidade
  createMongoAbility, // Função para criar habilidades usando CASL com suporte a MongoDB
  MongoAbility, // Tipo de habilidade do CASL para MongoDB
} from '@casl/ability'
import { z } from 'zod'

// Importa o tipo User, que representa os dados de um usuário
import type { User } from './models/user'
// Importa o módulo de permissões baseadas em função ou papel do usuário
import { permissions } from './permissions'
// Importa os esquemas de "subjects" usados para permissões (entidades do sistema)
import { billingSubject } from './subjects/billing'
import { inviteSubject } from './subjects/invite'
import { organizationSubject } from './subjects/organization'
import { projectSubject } from './subjects/project'
import { userSubject } from './subjects/user'

// Reexporta outros módulos importantes para facilitar o acesso em outros arquivos
export * from './models/organization'
export * from './models/project'
export * from './models/user'
export * from './roles'

// Define o esquema de habilidades válidas usando Zod, unindo os subjects e uma permissão global de "manage all"
const appAbilitiesSchema = z.union([
  projectSubject, // Permissões relacionadas a projetos
  userSubject, // Permissões relacionadas a usuários
  organizationSubject, // Permissões relacionadas a organizações
  inviteSubject, // Permissões relacionadas a convites
  billingSubject, // Permissões relacionadas a cobranças
  z.tuple([z.literal('manage'), z.literal('all')]), // Permissão para gerenciar tudo
])

// Define o tipo AppAbilities com base no esquema validado
type AppAbilities = z.infer<typeof appAbilitiesSchema>

// Define o tipo da habilidade principal da aplicação, baseado no MongoAbility
export type AppAbility = MongoAbility<AppAbilities>

// Cria uma função de criação de habilidades, especificando o tipo AppAbility
export const createAppAbility = createMongoAbility as CreateAbility<AppAbility>

// Função para definir as habilidades de um usuário com base em seu papel
export function defineAbilityFor(user: User) {
  // Cria um builder para facilitar a configuração de habilidades
  const builder = new AbilityBuilder(createAppAbility)

  // Verifica se há permissões configuradas para o papel do usuário
  if (typeof permissions[user.role] !== 'function') {
    throw new Error(`Permissions for role ${user.role} not found.`) // Lança erro se o papel do usuário não estiver definido
  }

  // Configura as permissões específicas para o papel do usuário
  permissions[user.role](user, builder)

  // Constrói as habilidades finais, configurando como detectar o tipo de entidade (subject)
  const ability = builder.build({
    detectSubjectType(subject) {
      return subject.__typename // Identifica o tipo de subject com base no campo __typename
    },
  })

  // Retorna as habilidades definidas
  return ability
}
