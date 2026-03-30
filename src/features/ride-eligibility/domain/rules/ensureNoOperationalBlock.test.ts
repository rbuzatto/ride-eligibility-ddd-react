import type { User } from '../entities/User'
import { ensureNoOperationalBlock } from './ensureNoOperationalBlock'

const baseUser: User = {
  id: 'user-1',
  name: 'Test User',
  accountStatus: 'Active',
  isBlocked: false,
  hasRideInProgress: false,
  planType: 'Basic',
}

describe('ensureNoOperationalBlock', () => {
  it('returns null when user is not blocked', () => {
    expect(ensureNoOperationalBlock(baseUser)).toBeNull()
  })

  it('returns OperationalBlock when user is blocked', () => {
    const user: User = { ...baseUser, isBlocked: true }
    expect(ensureNoOperationalBlock(user)).toBe('OperationalBlock')
  })
})
