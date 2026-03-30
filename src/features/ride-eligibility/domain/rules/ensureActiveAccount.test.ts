import type { User } from '../entities/User'
import { ensureActiveAccount } from './ensureActiveAccount'

const baseUser: User = {
  id: 'user-1',
  name: 'Test User',
  accountStatus: 'Active',
  isBlocked: false,
  hasRideInProgress: false,
  planType: 'Basic',
}

describe('ensureActiveAccount', () => {
  it('returns null when account is active', () => {
    expect(ensureActiveAccount(baseUser)).toBeNull()
  })

  it('returns InactiveAccount when account is inactive', () => {
    const user: User = { ...baseUser, accountStatus: 'Inactive' }
    expect(ensureActiveAccount(user)).toBe('InactiveAccount')
  })
})
