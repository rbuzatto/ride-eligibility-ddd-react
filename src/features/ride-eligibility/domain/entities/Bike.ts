import { type BikeAvailabilityStatus, isAvailable } from '../value-objects/BikeAvailabilityStatus'
import type { BikeType } from '../value-objects/BikeType'

export type Bike = {
  readonly id: string
  readonly model: string
  readonly bikeType: BikeType
  readonly availabilityStatus: BikeAvailabilityStatus
}

export function isAvailableForPickup(bike: Bike): boolean {
  return isAvailable(bike.availabilityStatus)
}
