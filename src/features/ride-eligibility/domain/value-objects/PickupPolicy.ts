export type PickupPolicy = 'Allowed' | 'Suspended' | 'ClosedForMaintenance'

export function allowsPickup(policy: PickupPolicy): boolean {
  return policy === 'Allowed'
}
