import { checkEligibility } from '../../domain/services/RideEligibilityService'
import type { EligibilityResult } from '../../domain/value-objects/EligibilityResult'
import type { BikeRepository } from '../ports/BikeRepository'
import type { StationRepository } from '../ports/StationRepository'
import type { UserRepository } from '../ports/UserRepository'

export type CheckRideEligibilityDeps = {
  userRepository: UserRepository
  bikeRepository: BikeRepository
  stationRepository: StationRepository
}

export type CheckRideEligibilityResult =
  | { success: true; result: EligibilityResult }
  | { success: false; error: string }

export function createCheckRideEligibility(deps: CheckRideEligibilityDeps) {
  return {
    execute(userId: string, bikeId: string, stationId: string): CheckRideEligibilityResult {
      const user = deps.userRepository.findById(userId)
      if (!user) {
        return { success: false, error: `User not found: ${userId}` }
      }

      const bike = deps.bikeRepository.findById(bikeId)
      if (!bike) {
        return { success: false, error: `Bike not found: ${bikeId}` }
      }

      const station = deps.stationRepository.findById(stationId)
      if (!station) {
        return { success: false, error: `Station not found: ${stationId}` }
      }

      const result = checkEligibility(user, bike, station)
      return { success: true, result }
    },
  }
}
