import type { PickupPolicy } from '../value-objects/PickupPolicy'

export type Station = {
  readonly id: string
  readonly name: string
  readonly pickupPolicy: PickupPolicy
}
