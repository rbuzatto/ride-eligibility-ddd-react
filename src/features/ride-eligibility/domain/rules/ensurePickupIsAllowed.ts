import type { Station } from '../entities/Station'
import type { BlockReason } from '../value-objects/BlockReason'

export function ensurePickupIsAllowed(station: Station): BlockReason | null {
  return !station.isPickupAllowed ? 'PickupNotAllowed' : null
}
