import type { Bike } from '../entities/Bike'
import type { User } from '../entities/User'
import type { BlockReason } from '../value-objects/BlockReason'
import { blockReasons } from '../value-objects/blockReasons'

export function ensurePlanCompatibility(user: User, bike: Bike): BlockReason | null {
  if (user.planType === 'Basic' && bike.bikeType === 'Electric') {
    return blockReasons.planNotCompatible()
  }
  return null
}
