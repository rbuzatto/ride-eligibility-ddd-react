import type { Station } from '../entities/Station'
import { ensurePickupIsAllowed } from './ensurePickupIsAllowed'

const baseStation: Station = {
  id: 'station-1',
  name: 'Test Station',
  pickupPolicy: 'Allowed',
}

describe('ensurePickupIsAllowed', () => {
  it('returns null when pickup policy is Allowed', () => {
    expect(ensurePickupIsAllowed(baseStation)).toBeNull()
  })

  it('returns PickupNotAllowed (soft) when pickup policy is Suspended', () => {
    const station: Station = { ...baseStation, pickupPolicy: 'Suspended' }
    const result = ensurePickupIsAllowed(station)
    expect(result).toEqual(
      expect.objectContaining({ code: 'PickupNotAllowed', severity: 'Soft', category: 'Station' }),
    )
  })

  it('returns PickupNotAllowed when pickup policy is ClosedForMaintenance', () => {
    const station: Station = { ...baseStation, pickupPolicy: 'ClosedForMaintenance' }
    const result = ensurePickupIsAllowed(station)
    expect(result).toEqual(expect.objectContaining({ code: 'PickupNotAllowed' }))
  })
})
