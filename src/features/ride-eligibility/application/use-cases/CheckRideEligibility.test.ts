import type { Bike } from '../../domain/entities/Bike'
import type { Station } from '../../domain/entities/Station'
import type { User } from '../../domain/entities/User'
import type { BikeRepository } from '../ports/BikeRepository'
import type { StationRepository } from '../ports/StationRepository'
import type { UserRepository } from '../ports/UserRepository'
import {
  type CheckRideEligibilityCommand,
  createCheckRideEligibility,
} from './CheckRideEligibility'

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
    userId: 'user-1',
    bikeId: 'bike-1',
    stationId: 'station-1',
    requestedAt: new Date(),
    ...overrides,
  }
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
  it('returns decided outcome with eligible result for valid inputs', () => {
    const deps = createTestRepositories()
    const useCase = createCheckRideEligibility(deps)

    const outcome = useCase.execute(createCommand())

    expect(outcome.outcome).toBe('decided')
    if (outcome.outcome === 'decided') {
      expect(outcome.result.eligible).toBe(true)
    }
  })

  it('returns entity_not_found when user does not exist', () => {
    const deps = createTestRepositories()
    const useCase = createCheckRideEligibility(deps)

    const outcome = useCase.execute(createCommand({ userId: 'unknown' }))

    expect(outcome).toEqual({
      outcome: 'entity_not_found',
      entity: 'User',
      id: 'unknown',
    })
  })

  it('returns entity_not_found when bike does not exist', () => {
    const deps = createTestRepositories()
    const useCase = createCheckRideEligibility(deps)

    const outcome = useCase.execute(createCommand({ bikeId: 'unknown' }))

    expect(outcome).toEqual({
      outcome: 'entity_not_found',
      entity: 'Bike',
      id: 'unknown',
    })
  })

  it('returns entity_not_found when station does not exist', () => {
    const deps = createTestRepositories()
    const useCase = createCheckRideEligibility(deps)

    const outcome = useCase.execute(createCommand({ stationId: 'unknown' }))

    expect(outcome).toEqual({
      outcome: 'entity_not_found',
      entity: 'Station',
      id: 'unknown',
    })
  })

  it('returns decided outcome with ineligible result when domain rules fail', () => {
    const inactiveUser: User = { ...validUser, accountStatus: 'Inactive' }
    const deps = createTestRepositories({ users: [inactiveUser] })
    const useCase = createCheckRideEligibility(deps)

    const outcome = useCase.execute(createCommand())

    expect(outcome.outcome).toBe('decided')
    if (outcome.outcome === 'decided') {
      expect(outcome.result.eligible).toBe(false)
    }
  })
})
