import { allowsRideStart } from './OperationalStatus'

describe('OperationalStatus', () => {
  it('allowsRideStart returns true for Clear', () => {
    expect(allowsRideStart('Clear')).toBe(true)
  })

  it('allowsRideStart returns false for Blocked', () => {
    expect(allowsRideStart('Blocked')).toBe(false)
  })

  it('allowsRideStart returns false for UnderReview', () => {
    expect(allowsRideStart('UnderReview')).toBe(false)
  })
})
