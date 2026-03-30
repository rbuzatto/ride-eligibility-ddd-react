import type { User } from '../entities/User'
import { ensureNoOperationalBlock } from './ensureNoOperationalBlock'

const baseUser: User = {
  id: 'user-1',
  name: 'Test User',
  accountStatus: 'Active',
  operationalStatus: 'Clear',
  hasRideInProgress: false,
  planType: 'Basic',
}

describe('ensureNoOperationalBlock', () => {
  it('returns null when operational status is Clear', () => {
    expect(ensureNoOperationalBlock(baseUser)).toBeNull()
  })

  it('returns OperationalBlock when status is Blocked', () => {
    const user: User = { ...baseUser, operationalStatus: 'Blocked' }
    const result = ensureNoOperationalBlock(user)
    expect(result).toEqual(
      expect.objectContaining({ code: 'OperationalBlock', severity: 'Hard', category: 'Account' }),
    )
  })

  it('returns OperationalBlock when status is UnderReview', () => {
    const user: User = { ...baseUser, operationalStatus: 'UnderReview' }
    const result = ensureNoOperationalBlock(user)
    expect(result).toEqual(expect.objectContaining({ code: 'OperationalBlock' }))
  })
})
