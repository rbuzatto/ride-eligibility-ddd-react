import {
  type BikeAvailabilityStatus,
  isAvailable,
} from '@/ride-elegibility/domain/domain-types/BikeAvailabilityStatus'
import type { BikeType } from '@/ride-elegibility/domain/domain-types/BikeType'
import { type BlockReason, blockReasons } from '@/ride-elegibility/domain/value-objects/BlockReason'

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
