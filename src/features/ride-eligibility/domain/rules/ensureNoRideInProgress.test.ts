import type { User } from '../entities/User'
import { ensureNoRideInProgress } from './ensureNoRideInProgress'

const baseUser: User = {
  id: 'user-1',
  name: 'Test User',
  accountStatus: 'Active',
  operationalStatus: 'Clear',
  hasRideInProgress: false,
  planType: 'Basic',
}

describe('ensureNoRideInProgress', () => {
  it('returns null when user has no ride in progress', () => {
    expect(ensureNoRideInProgress(baseUser)).toBeNull()
  })

  it('returns RideInProgress block reason when user has a ride in progress', () => {
    const user: User = { ...baseUser, hasRideInProgress: true }
    const result = ensureNoRideInProgress(user)
    expect(result).toEqual(
      expect.objectContaining({ code: 'RideInProgress', severity: 'Hard', category: 'Ride' }),
    )
  })
})
