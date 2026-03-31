import { type Station, stationAllowsPickup } from '../entities/Station'
import type { BlockReason } from '../value-objects/BlockReason'
import { blockReasons } from '../value-objects/blockReasons'

export function ensurePickupIsAllowed(station: Station): BlockReason | null {
  return !stationAllowsPickup(station) ? blockReasons.pickupNotAllowed() : null
}
