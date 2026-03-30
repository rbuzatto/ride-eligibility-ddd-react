import type { Bike } from '../entities/Bike'
import type { BlockReason } from '../value-objects/BlockReason'

export function ensureBikeIsAvailable(bike: Bike): BlockReason | null {
  return bike.availabilityStatus !== 'Available' ? 'BikeUnavailable' : null
}
