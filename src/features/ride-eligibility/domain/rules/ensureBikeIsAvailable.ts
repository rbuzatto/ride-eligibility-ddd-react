import type { Bike } from '../entities/Bike'
import type { BlockReason } from '../value-objects/BlockReason'
import { blockReasons } from '../value-objects/blockReasons'

export function ensureBikeIsAvailable(bike: Bike): BlockReason | null {
  return bike.availabilityStatus !== 'Available' ? blockReasons.bikeUnavailable() : null
}
