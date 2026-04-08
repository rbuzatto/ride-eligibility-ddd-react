import {
  type CheckRideEligibilityCommand,
  checkRideEligibility,
} from '@/ride-elegibility/application/use-cases/CheckRideEligibility'
import type { Bike } from '@/ride-elegibility/domain/entities/Bike'
import type { Station } from '@/ride-elegibility/domain/entities/Station'
import type { User } from '@/ride-elegibility/domain/entities/User'

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

function createCommand(
  overrides?: Partial<CheckRideEligibilityCommand>,
): CheckRideEligibilityCommand {
  return {
    user: validUser,
    bike: availableBike,
    station: validStation,
    ...overrides,
  }
}

describe('CheckRideEligibility', () => {
  it('returns decided outcome with eligible result for valid inputs', async () => {
    const outcome = await checkRideEligibility.execute(createCommand())

    expect(outcome.outcome).toBe('decided')
    if (outcome.outcome === 'decided') {
      expect(outcome.result.eligible).toBe(true)
    }
  })

  it('returns entity_not_found when user does not exist', async () => {
    const outcome = await checkRideEligibility.execute(createCommand({ user: null }))

    expect(outcome).toEqual({
      outcome: 'entity_not_found',
      entity: 'User',
      id: 'selected-user',
    })
  })

  it('returns entity_not_found when bike does not exist', async () => {
    const outcome = await checkRideEligibility.execute(createCommand({ bike: null }))

    expect(outcome).toEqual({
      outcome: 'entity_not_found',
      entity: 'Bike',
      id: 'selected-bike',
    })
  })

  it('returns entity_not_found when station does not exist', async () => {
    const outcome = await checkRideEligibility.execute(createCommand({ station: null }))

    expect(outcome).toEqual({
      outcome: 'entity_not_found',
      entity: 'Station',
      id: 'selected-station',
    })
  })

  it('returns decided outcome with ineligible result when domain rules fail', async () => {
    const inactiveUser: User = { ...validUser, accountStatus: 'Inactive' }
    const outcome = await checkRideEligibility.execute(createCommand({ user: inactiveUser }))

    expect(outcome.outcome).toBe('decided')
    if (outcome.outcome === 'decided') {
      expect(outcome.result.eligible).toBe(false)
    }
  })
})
