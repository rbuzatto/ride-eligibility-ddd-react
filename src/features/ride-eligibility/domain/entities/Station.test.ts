import { checkPickupEligibility, type Station, stationAllowsPickup } from './Station'

const baseStation: Station = {
  id: 'station-1',
  name: 'Test Station',
  pickupPolicy: 'Allowed',
}

describe('Station pure predicates', () => {
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

describe('Station eligibility evaluation', () => {
  it('checkPickupEligibility returns null when pickup is allowed', () => {
    expect(checkPickupEligibility(baseStation)).toBeNull()
  })

  it('checkPickupEligibility returns PickupNotAllowed for Suspended policy', () => {
    const result = checkPickupEligibility({ ...baseStation, pickupPolicy: 'Suspended' })
    expect(result).toEqual(
      expect.objectContaining({ code: 'PickupNotAllowed', severity: 'Soft', category: 'Station' }),
    )
  })

  it('checkPickupEligibility returns PickupNotAllowed for ClosedForMaintenance', () => {
    const result = checkPickupEligibility({
      ...baseStation,
      pickupPolicy: 'ClosedForMaintenance',
    })
    expect(result).toEqual(expect.objectContaining({ code: 'PickupNotAllowed' }))
  })
})
