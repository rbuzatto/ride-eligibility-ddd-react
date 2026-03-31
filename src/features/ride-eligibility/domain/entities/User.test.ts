import { canStartNewRide, hasOperationalRestriction, isAccountActive, type User } from './User'

const baseUser: User = {
  id: 'user-1',
  name: 'Test User',
  accountStatus: 'Active',
  operationalStatus: 'Clear',
  hasRideInProgress: false,
  planType: 'Basic',
}

describe('User domain functions', () => {
  describe('isAccountActive', () => {
    it('returns true for active account', () => {
      expect(isAccountActive(baseUser)).toBe(true)
    })

    it('returns false for inactive account', () => {
      expect(isAccountActive({ ...baseUser, accountStatus: 'Inactive' })).toBe(false)
    })
  })

  describe('hasOperationalRestriction', () => {
    it('returns false when operational status is Clear', () => {
      expect(hasOperationalRestriction(baseUser)).toBe(false)
    })

    it('returns true when operational status is Blocked', () => {
      expect(hasOperationalRestriction({ ...baseUser, operationalStatus: 'Blocked' })).toBe(true)
    })

    it('returns true when operational status is UnderReview', () => {
      expect(hasOperationalRestriction({ ...baseUser, operationalStatus: 'UnderReview' })).toBe(
        true,
      )
    })
  })

  describe('canStartNewRide', () => {
    it('returns true when all conditions are met', () => {
      expect(canStartNewRide(baseUser)).toBe(true)
    })

    it('returns false when account is inactive', () => {
      expect(canStartNewRide({ ...baseUser, accountStatus: 'Inactive' })).toBe(false)
    })

    it('returns false when user is blocked', () => {
      expect(canStartNewRide({ ...baseUser, operationalStatus: 'Blocked' })).toBe(false)
    })

    it('returns false when user has ride in progress', () => {
      expect(canStartNewRide({ ...baseUser, hasRideInProgress: true })).toBe(false)
    })

    it('returns false when multiple restrictions apply', () => {
      expect(
        canStartNewRide({
          ...baseUser,
          accountStatus: 'Inactive',
          operationalStatus: 'Blocked',
          hasRideInProgress: true,
        }),
      ).toBe(false)
    })
  })
})
