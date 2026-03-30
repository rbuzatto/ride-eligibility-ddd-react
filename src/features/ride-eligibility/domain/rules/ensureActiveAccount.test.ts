import type { User } from '../entities/User'
import { ensureActiveAccount } from './ensureActiveAccount'

const baseUser: User = {
  id: 'user-1',
  name: 'Test User',
  accountStatus: 'Active',
  operationalStatus: 'Clear',
  hasRideInProgress: false,
  planType: 'Basic',
}

describe('ensureActiveAccount', () => {
  it('returns null when account is active', () => {
    expect(ensureActiveAccount(baseUser)).toBeNull()
  })

  it('returns InactiveAccount block reason when account is inactive', () => {
    const user: User = { ...baseUser, accountStatus: 'Inactive' }
    const result = ensureActiveAccount(user)
    expect(result).toEqual(
      expect.objectContaining({ code: 'InactiveAccount', severity: 'Hard', category: 'Account' }),
    )
  })
})
