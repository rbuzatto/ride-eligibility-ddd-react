import type { Bike } from '../entities/Bike'
import type { User } from '../entities/User'
import type { BlockReason } from '../value-objects/BlockReason'
import { blockReasons } from '../value-objects/blockReasons'
import { supportsBikeType } from '../value-objects/PlanType'

export function ensurePlanCompatibility(user: User, bike: Bike): BlockReason | null {
  return !supportsBikeType(user.planType, bike.bikeType) ? blockReasons.planNotCompatible() : null
}
