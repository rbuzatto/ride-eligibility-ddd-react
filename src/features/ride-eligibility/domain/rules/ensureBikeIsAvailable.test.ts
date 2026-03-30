import type { Bike } from '../entities/Bike'
import { ensureBikeIsAvailable } from './ensureBikeIsAvailable'

const baseBike: Bike = {
  id: 'bike-1',
  model: 'Test Bike',
  bikeType: 'Standard',
  availabilityStatus: 'Available',
}

describe('ensureBikeIsAvailable', () => {
  it('returns null when bike is available', () => {
    expect(ensureBikeIsAvailable(baseBike)).toBeNull()
  })

  it('returns BikeUnavailable when bike is unavailable', () => {
    const bike: Bike = { ...baseBike, availabilityStatus: 'Unavailable' }
    expect(ensureBikeIsAvailable(bike)).toBe('BikeUnavailable')
  })
})
