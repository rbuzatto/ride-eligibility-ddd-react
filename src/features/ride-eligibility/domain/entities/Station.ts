import { allowsPickup, type PickupPolicy } from '../value-objects/PickupPolicy'

export type Station = {
  readonly id: string
  readonly name: string
  readonly pickupPolicy: PickupPolicy
}

export function stationAllowsPickup(station: Station): boolean {
  return allowsPickup(station.pickupPolicy)
}
