import type { BikeAvailabilityStatus } from '../value-objects/BikeAvailabilityStatus'
import type { BikeType } from '../value-objects/BikeType'

export type Bike = {
  id: string
  model: string
  bikeType: BikeType
  availabilityStatus: BikeAvailabilityStatus
}
