import { allowsPickup } from './PickupPolicy'

describe('PickupPolicy', () => {
  it('allowsPickup returns true for Allowed', () => {
    expect(allowsPickup('Allowed')).toBe(true)
  })

  it('allowsPickup returns false for Suspended', () => {
    expect(allowsPickup('Suspended')).toBe(false)
  })

  it('allowsPickup returns false for ClosedForMaintenance', () => {
    expect(allowsPickup('ClosedForMaintenance')).toBe(false)
  })
})
