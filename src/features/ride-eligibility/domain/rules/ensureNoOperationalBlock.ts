import type { User } from '../entities/User'
import type { BlockReason } from '../value-objects/BlockReason'
import { blockReasons } from '../value-objects/blockReasons'

export function ensureNoOperationalBlock(user: User): BlockReason | null {
  return user.operationalStatus !== 'Clear' ? blockReasons.operationalBlock() : null
}
