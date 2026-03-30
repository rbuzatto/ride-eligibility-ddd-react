import { createCheckRideEligibility } from './application/use-cases/CheckRideEligibility'
import { createInMemoryBikeRepository } from './infrastructure/repositories/InMemoryBikeRepository'
import { createInMemoryStationRepository } from './infrastructure/repositories/InMemoryStationRepository'
import { createInMemoryUserRepository } from './infrastructure/repositories/InMemoryUserRepository'
import type { RideEligibilityModule } from './presentation/context/RideEligibilityContext'

const userRepository = createInMemoryUserRepository()
const bikeRepository = createInMemoryBikeRepository()
const stationRepository = createInMemoryStationRepository()

const checkRideEligibility = createCheckRideEligibility({
  userRepository,
  bikeRepository,
  stationRepository,
})

export const rideEligibilityModule: RideEligibilityModule = {
  userRepository,
  bikeRepository,
  stationRepository,
  checkRideEligibility,
}
