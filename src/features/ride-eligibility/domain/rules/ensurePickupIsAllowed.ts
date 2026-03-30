import type { Station } from '../entities/Station'
import type { BlockReason } from '../value-objects/BlockReason'
import { blockReasons } from '../value-objects/blockReasons'

export function ensurePickupIsAllowed(station: Station): BlockReason | null {
  return station.pickupPolicy !== 'Allowed' ? blockReasons.pickupNotAllowed() : null
}
