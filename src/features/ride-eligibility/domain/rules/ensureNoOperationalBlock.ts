import type { User } from '../entities/User'
import type { BlockReason } from '../value-objects/BlockReason'

export function ensureNoOperationalBlock(user: User): BlockReason | null {
  return user.isBlocked ? 'OperationalBlock' : null
}
