export function getInitials(name: string): string {
  const initials = name
    .split(' ') // Divide o nome em palavras
    .map((word) => word.charAt(0).toUpperCase()) // Pega a primeira letra de cada palavra
    .slice(0, 2) // Mantém apenas as duas primeiras letras
    .join('')

  return initials
}
