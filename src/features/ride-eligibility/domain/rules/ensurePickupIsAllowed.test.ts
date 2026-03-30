import type { Station } from '../entities/Station'
import { ensurePickupIsAllowed } from './ensurePickupIsAllowed'

const baseStation: Station = {
  id: 'station-1',
  name: 'Test Station',
  isPickupAllowed: true,
}

describe('ensurePickupIsAllowed', () => {
  it('returns null when pickup is allowed', () => {
    expect(ensurePickupIsAllowed(baseStation)).toBeNull()
  })

  it('returns PickupNotAllowed when pickup is not allowed', () => {
    const station: Station = { ...baseStation, isPickupAllowed: false }
    expect(ensurePickupIsAllowed(station)).toBe('PickupNotAllowed')
  })
})
