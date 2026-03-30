import type { User } from '../entities/User'
import type { BlockReason } from '../value-objects/BlockReason'

export function ensureActiveAccount(user: User): BlockReason | null {
  return user.accountStatus !== 'Active' ? 'InactiveAccount' : null
}
