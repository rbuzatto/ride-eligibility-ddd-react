import { type Station, stationAllowsPickup } from './Station'

const baseStation: Station = {
  id: 'station-1',
  name: 'Test Station',
  pickupPolicy: 'Allowed',
}

describe('Station domain functions', () => {
  it('stationAllowsPickup returns true when policy is Allowed', () => {
    expect(stationAllowsPickup(baseStation)).toBe(true)
  })

  it('stationAllowsPickup returns false when policy is Suspended', () => {
    expect(stationAllowsPickup({ ...baseStation, pickupPolicy: 'Suspended' })).toBe(false)
  })

  it('stationAllowsPickup returns false when policy is ClosedForMaintenance', () => {
    expect(stationAllowsPickup({ ...baseStation, pickupPolicy: 'ClosedForMaintenance' })).toBe(
      false,
    )
  })
})
