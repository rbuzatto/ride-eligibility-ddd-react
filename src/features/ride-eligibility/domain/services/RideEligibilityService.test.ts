import type { Bike } from '@/ride-elegibility/domain/entities/Bike'
import type { Station } from '@/ride-elegibility/domain/entities/Station'
import type { User } from '@/ride-elegibility/domain/entities/User'
import { checkEligibility } from '@/ride-elegibility/domain/services/RideEligibilityService'

const validUser: User = {
  id: 'user-1',
  name: 'Valid User',
  accountStatus: 'Active',
  operationalStatus: 'Clear',
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
  pickupPolicy: 'Allowed',
}

describe('RideEligibilityService', () => {
  it('returns eligible with evaluatedAt when all rules pass', () => {
    const result = checkEligibility(validUser, availableBike, validStation)
    expect(result.eligible).toBe(true)
    expect(result.evaluatedAt).toBeInstanceOf(Date)
  })

  it('returns ineligible with one hard block reason', () => {
    const inactiveUser: User = { ...validUser, accountStatus: 'Inactive' }
    const result = checkEligibility(inactiveUser, availableBike, validStation)

    expect(result.eligible).toBe(false)
    if (!result.eligible) {
      expect(result.reasons).toHaveLength(1)
      expect(result.reasons[0].code).toBe('InactiveAccount')
      expect(result.hardBlocks).toHaveLength(1)
      expect(result.softBlocks).toHaveLength(0)
    }
  })

  it('partitions hard blocks and soft blocks correctly', () => {
    const basicUser: User = { ...validUser, planType: 'Basic' }
    const suspendedStation: Station = { ...validStation, pickupPolicy: 'Suspended' }
    const result = checkEligibility(basicUser, availableBike, suspendedStation)

    expect(result.eligible).toBe(false)
    if (!result.eligible) {
      expect(result.hardBlocks).toHaveLength(0)
      expect(result.softBlocks).toHaveLength(2)
      expect(result.softBlocks.map((r) => r.code)).toContain('PlanNotCompatible')
      expect(result.softBlocks.map((r) => r.code)).toContain('PickupNotAllowed')
    }
  })

  it('returns multiple reasons across categories when multiple rules fail', () => {
    const problematicUser: User = {
      ...validUser,
      accountStatus: 'Inactive',
      operationalStatus: 'Blocked',
      hasRideInProgress: true,
    }
    const unavailableBike: Bike = { ...availableBike, availabilityStatus: 'Unavailable' }
    const blockedStation: Station = { ...validStation, pickupPolicy: 'ClosedForMaintenance' }

    const result = checkEligibility(problematicUser, unavailableBike, blockedStation)

    expect(result.eligible).toBe(false)
    if (!result.eligible) {
      expect(result.reasons.map((r) => r.code)).toContain('InactiveAccount')
      expect(result.reasons.map((r) => r.code)).toContain('OperationalBlock')
      expect(result.reasons.map((r) => r.code)).toContain('RideInProgress')
      expect(result.reasons.map((r) => r.code)).toContain('BikeUnavailable')
      expect(result.reasons.map((r) => r.code)).toContain('PickupNotAllowed')
      expect(result.hardBlocks.length).toBeGreaterThan(0)
    }
  })

  it('blocks basic user trying to rent electric bike with soft severity', () => {
    const basicUser: User = { ...validUser, planType: 'Basic' }
    const result = checkEligibility(basicUser, availableBike, validStation)

    expect(result.eligible).toBe(false)
    if (!result.eligible) {
      expect(result.softBlocks).toHaveLength(1)
      expect(result.softBlocks[0].code).toBe('PlanNotCompatible')
    }
  })

  it('allows basic user to rent standard bike', () => {
    const basicUser: User = { ...validUser, planType: 'Basic' }
    const standardBike: Bike = { ...availableBike, bikeType: 'Standard' }
    const result = checkEligibility(basicUser, standardBike, validStation)

    expect(result.eligible).toBe(true)
  })

  it('does not produce duplicate reason codes', () => {
    const user: User = { ...validUser, accountStatus: 'Inactive' }
    const result = checkEligibility(user, availableBike, validStation)

    if (!result.eligible) {
      const codes = result.reasons.map((r) => r.code)
      const unique = new Set(codes)
      expect(unique.size).toBe(codes.length)
    }
  })

  it('each block reason carries a non-empty message', () => {
    const user: User = { ...validUser, accountStatus: 'Inactive', operationalStatus: 'Blocked' }
    const result = checkEligibility(user, availableBike, validStation)

    if (!result.eligible) {
      for (const reason of result.reasons) {
        expect(reason.message).toBeTruthy()
      }
    }
  })
})
