import type { User } from '../entities/User'
import type { BlockReason } from '../value-objects/BlockReason'
import { blockReasons } from '../value-objects/blockReasons'

export function ensureNoRideInProgress(user: User): BlockReason | null {
  return user.hasRideInProgress ? blockReasons.rideInProgress() : null
}
