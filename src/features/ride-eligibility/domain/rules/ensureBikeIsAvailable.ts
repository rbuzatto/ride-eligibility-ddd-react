import { type Bike, isAvailableForPickup } from '../entities/Bike'
import type { BlockReason } from '../value-objects/BlockReason'
import { blockReasons } from '../value-objects/blockReasons'

export function ensureBikeIsAvailable(bike: Bike): BlockReason | null {
  return !isAvailableForPickup(bike) ? blockReasons.bikeUnavailable() : null
}
