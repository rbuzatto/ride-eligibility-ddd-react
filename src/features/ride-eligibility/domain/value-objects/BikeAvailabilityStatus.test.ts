import { isAvailable } from './BikeAvailabilityStatus'

describe('BikeAvailabilityStatus', () => {
  it('isAvailable returns true for Available', () => {
    expect(isAvailable('Available')).toBe(true)
  })

  it('isAvailable returns false for Unavailable', () => {
    expect(isAvailable('Unavailable')).toBe(false)
  })
})
