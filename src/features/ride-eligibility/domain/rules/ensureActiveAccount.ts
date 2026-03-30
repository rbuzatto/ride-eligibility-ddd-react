import type { User } from '../entities/User'
import type { BlockReason } from '../value-objects/BlockReason'
import { blockReasons } from '../value-objects/blockReasons'

export function ensureActiveAccount(user: User): BlockReason | null {
  return user.accountStatus !== 'Active' ? blockReasons.inactiveAccount() : null
}
