import type { Bike } from '../../domain/entities/Bike'
import type { Station } from '../../domain/entities/Station'
import type { User } from '../../domain/entities/User'
import type { BikeRepository } from '../ports/BikeRepository'
import type { StationRepository } from '../ports/StationRepository'
import type { UserRepository } from '../ports/UserRepository'
import { createCheckRideEligibility } from './CheckRideEligibility'

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

function createTestRepositories(overrides?: {
  users?: User[]
  bikes?: Bike[]
  stations?: Station[]
}) {
  const users = overrides?.users ?? [validUser]
  const bikes = overrides?.bikes ?? [availableBike]
  const stations = overrides?.stations ?? [validStation]

  const userRepository: UserRepository = {
    findById: (id) => users.find((u) => u.id === id) ?? null,
    findAll: () => [...users],
  }

  const bikeRepository: BikeRepository = {
    findById: (id) => bikes.find((b) => b.id === id) ?? null,
    findAll: () => [...bikes],
  }

  const stationRepository: StationRepository = {
    findById: (id) => stations.find((s) => s.id === id) ?? null,
    findAll: () => [...stations],
  }

  return { userRepository, bikeRepository, stationRepository }
}

describe('CheckRideEligibility', () => {
  it('returns eligible result for valid inputs', () => {
    const deps = createTestRepositories()
    const useCase = createCheckRideEligibility(deps)

    const outcome = useCase.execute('user-1', 'bike-1', 'station-1')

    expect(outcome.success).toBe(true)
    if (outcome.success) {
      expect(outcome.result).toEqual({ eligible: true })
    }
  })

  it('returns error when user is not found', () => {
    const deps = createTestRepositories()
    const useCase = createCheckRideEligibility(deps)

    const outcome = useCase.execute('unknown', 'bike-1', 'station-1')

    expect(outcome.success).toBe(false)
    if (!outcome.success) {
      expect(outcome.error).toContain('User not found')
    }
  })

  it('returns error when bike is not found', () => {
    const deps = createTestRepositories()
    const useCase = createCheckRideEligibility(deps)

    const outcome = useCase.execute('user-1', 'unknown', 'station-1')

    expect(outcome.success).toBe(false)
    if (!outcome.success) {
      expect(outcome.error).toContain('Bike not found')
    }
  })

  it('returns error when station is not found', () => {
    const deps = createTestRepositories()
    const useCase = createCheckRideEligibility(deps)

    const outcome = useCase.execute('user-1', 'bike-1', 'unknown')

    expect(outcome.success).toBe(false)
    if (!outcome.success) {
      expect(outcome.error).toContain('Station not found')
    }
  })

  it('returns blocked result when domain rules fail', () => {
    const inactiveUser: User = { ...validUser, accountStatus: 'Inactive' }
    const deps = createTestRepositories({ users: [inactiveUser] })
    const useCase = createCheckRideEligibility(deps)

    const outcome = useCase.execute('user-1', 'bike-1', 'station-1')

    expect(outcome.success).toBe(true)
    if (outcome.success) {
      expect(outcome.result.eligible).toBe(false)
    }
  })
})
