import type { BlockReason } from '../value-objects/BlockReason'
import { blockReasons } from '../value-objects/blockReasons'
import { allowsPickup, type PickupPolicy } from '../value-objects/PickupPolicy'

export type Station = {
  readonly id: string
  readonly name: string
  readonly pickupPolicy: PickupPolicy
}

export function stationAllowsPickup(station: Station): boolean {
  return allowsPickup(station.pickupPolicy)
}

export function checkPickupEligibility(station: Station): BlockReason | null {
  return !stationAllowsPickup(station) ? blockReasons.pickupNotAllowed() : null
}
