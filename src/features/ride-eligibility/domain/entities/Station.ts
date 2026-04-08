import {
  allowsPickup,
  type PickupPolicy,
} from '@/ride-elegibility/domain/domain-types/PickupPolicy'
import { type BlockReason, blockReasons } from '@/ride-elegibility/domain/value-objects/BlockReason'

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
