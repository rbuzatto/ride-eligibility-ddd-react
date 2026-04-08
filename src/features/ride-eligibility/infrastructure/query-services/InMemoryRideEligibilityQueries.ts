import type { BikeRepository } from '@/ride-elegibility/application/ports/BikeRepository'
import type { StationRepository } from '@/ride-elegibility/application/ports/StationRepository'
import type { UserRepository } from '@/ride-elegibility/application/ports/UserRepository'
import type { RideEligibilityQueries } from '@/ride-elegibility/application/queries/RideEligibilityQueries'

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
