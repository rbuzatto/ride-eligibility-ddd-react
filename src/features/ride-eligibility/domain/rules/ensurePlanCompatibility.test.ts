import type { Bike } from '../entities/Bike'
import type { User } from '../entities/User'
import { ensurePlanCompatibility } from './ensurePlanCompatibility'

const baseUser: User = {
  id: 'user-1',
  name: 'Test User',
  accountStatus: 'Active',
  isBlocked: false,
  hasRideInProgress: false,
  planType: 'Basic',
}

const standardBike: Bike = {
  id: 'bike-1',
  model: 'Standard Bike',
  bikeType: 'Standard',
  availabilityStatus: 'Available',
}

const electricBike: Bike = {
  id: 'bike-2',
  model: 'Electric Bike',
  bikeType: 'Electric',
  availabilityStatus: 'Available',
}

describe('ensurePlanCompatibility', () => {
  it('returns null when basic user selects standard bike', () => {
    expect(ensurePlanCompatibility(baseUser, standardBike)).toBeNull()
  })

  it('returns PlanNotCompatible when basic user selects electric bike', () => {
    expect(ensurePlanCompatibility(baseUser, electricBike)).toBe('PlanNotCompatible')
  })

  it('returns null when premium user selects standard bike', () => {
    const premiumUser: User = { ...baseUser, planType: 'Premium' }
    expect(ensurePlanCompatibility(premiumUser, standardBike)).toBeNull()
  })

  it('returns null when premium user selects electric bike', () => {
    const premiumUser: User = { ...baseUser, planType: 'Premium' }
    expect(ensurePlanCompatibility(premiumUser, electricBike)).toBeNull()
  })
})
