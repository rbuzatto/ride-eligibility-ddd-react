export type AccountStatus = 'Active' | 'Inactive'

export function isActive(status: AccountStatus): boolean {
  return status === 'Active'
}
