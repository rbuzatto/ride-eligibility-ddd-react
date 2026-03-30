import type { User } from '../entities/User'
import type { BlockReason } from '../value-objects/BlockReason'

export function ensureNoRideInProgress(user: User): BlockReason | null {
  return user.hasRideInProgress ? 'RideInProgress' : null
}
