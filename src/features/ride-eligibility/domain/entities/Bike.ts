import { type BikeAvailabilityStatus, isAvailable } from '../value-objects/BikeAvailabilityStatus'
import type { BikeType } from '../value-objects/BikeType'
import type { BlockReason } from '../value-objects/BlockReason'
import { blockReasons } from '../value-objects/blockReasons'

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
