import { type Bike, checkBikeAvailability, isAvailableForPickup } from './Bike'

const baseBike: Bike = {
  id: 'bike-1',
  model: 'Test Bike',
  bikeType: 'Standard',
  availabilityStatus: 'Available',
}

describe('Bike pure predicates', () => {
  it('isAvailableForPickup returns true when bike is available', () => {
    expect(isAvailableForPickup(baseBike)).toBe(true)
  })

  it('isAvailableForPickup returns false when bike is unavailable', () => {
    expect(isAvailableForPickup({ ...baseBike, availabilityStatus: 'Unavailable' })).toBe(false)
  })
})

describe('Bike eligibility evaluation', () => {
  it('checkBikeAvailability returns null when bike is available', () => {
    expect(checkBikeAvailability(baseBike)).toBeNull()
  })

  it('checkBikeAvailability returns BikeUnavailable when bike is unavailable', () => {
    const result = checkBikeAvailability({ ...baseBike, availabilityStatus: 'Unavailable' })
    expect(result).toEqual(
      expect.objectContaining({ code: 'BikeUnavailable', severity: 'Hard', category: 'Bike' }),
    )
  })
})
