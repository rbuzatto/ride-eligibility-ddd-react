import type { BikeRepository } from '../../application/ports/BikeRepository'
import type { StationRepository } from '../../application/ports/StationRepository'
import type { UserRepository } from '../../application/ports/UserRepository'
import type { RideEligibilityQueries } from '../../application/queries/RideEligibilityQueries'

export function createInMemoryRideEligibilityQueries(deps: {
  userRepository: UserRepository
  bikeRepository: BikeRepository
  stationRepository: StationRepository
}): RideEligibilityQueries {
  return {
    getUsers: () => deps.userRepository.findAll(),
    getBikes: () => deps.bikeRepository.findAll(),
    getStations: () => deps.stationRepository.findAll(),
  }
}
