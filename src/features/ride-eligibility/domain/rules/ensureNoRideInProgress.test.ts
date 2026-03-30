import type { User } from '../entities/User'
import { ensureNoRideInProgress } from './ensureNoRideInProgress'

const baseUser: User = {
  id: 'user-1',
  name: 'Test User',
  accountStatus: 'Active',
  isBlocked: false,
  hasRideInProgress: false,
  planType: 'Basic',
}

describe('ensureNoRideInProgress', () => {
  it('returns null when user has no ride in progress', () => {
    expect(ensureNoRideInProgress(baseUser)).toBeNull()
  })

  it('returns RideInProgress when user has a ride in progress', () => {
    const user: User = { ...baseUser, hasRideInProgress: true }
    expect(ensureNoRideInProgress(user)).toBe('RideInProgress')
  })
})
