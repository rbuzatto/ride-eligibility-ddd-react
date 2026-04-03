import { type BikeAvailabilityStatus, isAvailable } from '../domain-types/BikeAvailabilityStatus'
import type { BikeType } from '../domain-types/BikeType'
import { type BlockReason, blockReasons } from '../value-objects/BlockReason'

export type Bike = {
  readonly id: string
  readonly model: string
  readonly bikeType: BikeType
  readonly availabilityStatus: BikeAvailabilityStatus
}

export function isAvailableForPickup(bike: Bike): boolean {
  return isAvailable(bike.availabilityStatus)
}

export function checkBikeAvailability(bike: Bike): BlockReason | null {
  return !isAvailableForPickup(bike) ? blockReasons.bikeUnavailable() : null
}
