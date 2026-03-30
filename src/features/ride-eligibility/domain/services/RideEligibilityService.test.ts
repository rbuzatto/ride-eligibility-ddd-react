import type { Bike } from '../entities/Bike'
import type { Station } from '../entities/Station'
import type { User } from '../entities/User'
import { checkEligibility } from './RideEligibilityService'

const validUser: User = {
  id: 'user-1',
  name: 'Valid User',
  accountStatus: 'Active',
  isBlocked: false,
  hasRideInProgress: false,
  planType: 'Premium',
}

const availableBike: Bike = {
  id: 'bike-1',
  model: 'Test Bike',
  bikeType: 'Electric',
  availabilityStatus: 'Available',
}

const validStation: Station = {
  id: 'station-1',
  name: 'Test Station',
  isPickupAllowed: true,
}

describe('RideEligibilityService', () => {
  it('returns eligible when all rules pass', () => {
    const result = checkEligibility(validUser, availableBike, validStation)
    expect(result).toEqual({ eligible: true })
  })

  it('returns blocked with one reason when one rule fails', () => {
    const inactiveUser: User = { ...validUser, accountStatus: 'Inactive' }
    const result = checkEligibility(inactiveUser, availableBike, validStation)

    expect(result.eligible).toBe(false)
    if (!result.eligible) {
      expect(result.reasons).toEqual(['InactiveAccount'])
    }
  })

  it('returns blocked with multiple reasons when multiple rules fail', () => {
    const problematicUser: User = {
      ...validUser,
      accountStatus: 'Inactive',
      isBlocked: true,
      hasRideInProgress: true,
    }
    const unavailableBike: Bike = { ...availableBike, availabilityStatus: 'Unavailable' }
    const blockedStation: Station = { ...validStation, isPickupAllowed: false }

    const result = checkEligibility(problematicUser, unavailableBike, blockedStation)

    expect(result.eligible).toBe(false)
    if (!result.eligible) {
      expect(result.reasons).toContain('InactiveAccount')
      expect(result.reasons).toContain('OperationalBlock')
      expect(result.reasons).toContain('RideInProgress')
      expect(result.reasons).toContain('BikeUnavailable')
      expect(result.reasons).toContain('PickupNotAllowed')
      expect(result.reasons.length).toBe(5)
    }
  })

  it('blocks basic user trying to rent electric bike', () => {
    const basicUser: User = { ...validUser, planType: 'Basic' }
    const result = checkEligibility(basicUser, availableBike, validStation)

    expect(result.eligible).toBe(false)
    if (!result.eligible) {
      expect(result.reasons).toEqual(['PlanNotCompatible'])
    }
  })

  it('allows basic user to rent standard bike', () => {
    const basicUser: User = { ...validUser, planType: 'Basic' }
    const standardBike: Bike = { ...availableBike, bikeType: 'Standard' }
    const result = checkEligibility(basicUser, standardBike, validStation)

    expect(result).toEqual({ eligible: true })
  })

  it('does not produce duplicate reasons', () => {
    const user: User = { ...validUser, accountStatus: 'Inactive' }
    const result = checkEligibility(user, availableBike, validStation)

    if (!result.eligible) {
      const unique = new Set(result.reasons)
      expect(unique.size).toBe(result.reasons.length)
    }
  })
})
