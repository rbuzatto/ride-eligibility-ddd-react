import { type Bike, isAvailableForPickup } from './Bike'

const baseBike: Bike = {
  id: 'bike-1',
  model: 'Test Bike',
  bikeType: 'Standard',
  availabilityStatus: 'Available',
}

describe('Bike domain functions', () => {
  it('isAvailableForPickup returns true when bike is available', () => {
    expect(isAvailableForPickup(baseBike)).toBe(true)
  })

  it('isAvailableForPickup returns false when bike is unavailable', () => {
    expect(isAvailableForPickup({ ...baseBike, availabilityStatus: 'Unavailable' })).toBe(false)
  })
})
