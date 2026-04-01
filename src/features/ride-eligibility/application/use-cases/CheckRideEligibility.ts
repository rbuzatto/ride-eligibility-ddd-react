import { checkEligibility } from '../../domain/services/RideEligibilityService'
import type { EligibilityResult } from '../../domain/value-objects/EligibilityResult'
import type { BikeRepository } from '../ports/BikeRepository'
import type { StationRepository } from '../ports/StationRepository'
import type { UserRepository } from '../ports/UserRepository'

export type CheckRideEligibilityCommand = {
  readonly userId: string
  readonly bikeId: string
  readonly stationId: string
  readonly requestedAt: Date
}

export type CheckRideEligibilityDeps = {
  userRepository: UserRepository
  bikeRepository: BikeRepository
  stationRepository: StationRepository
}

export type CheckRideEligibilityResult =
  | { outcome: 'decided'; result: EligibilityResult }
  | { outcome: 'entity_not_found'; entity: 'User' | 'Bike' | 'Station'; id: string }

export function createCheckRideEligibility(deps: CheckRideEligibilityDeps) {
  return {
    async execute(command: CheckRideEligibilityCommand): Promise<CheckRideEligibilityResult> {
      const user = await deps.userRepository.findById(command.userId)
      if (!user) {
        return { outcome: 'entity_not_found', entity: 'User', id: command.userId }
      }

      const bike = await deps.bikeRepository.findById(command.bikeId)
      if (!bike) {
        return { outcome: 'entity_not_found', entity: 'Bike', id: command.bikeId }
      }

      const station = await deps.stationRepository.findById(command.stationId)
      if (!station) {
        return { outcome: 'entity_not_found', entity: 'Station', id: command.stationId }
      }

      const result = checkEligibility(user, bike, station)
      return { outcome: 'decided', result }
    },
  }
}
