import { createCheckRideEligibility } from './application/use-cases/CheckRideEligibility'
import { createInMemoryRideEligibilityQueries } from './infrastructure/query-services/InMemoryRideEligibilityQueries'
import { createInMemoryBikeRepository } from './infrastructure/repositories/InMemoryBikeRepository'
import { createInMemoryStationRepository } from './infrastructure/repositories/InMemoryStationRepository'
import { createInMemoryUserRepository } from './infrastructure/repositories/InMemoryUserRepository'
import type { RideEligibilityModule } from './presentation/context/RideEligibilityContext'

const userRepository = createInMemoryUserRepository()
const bikeRepository = createInMemoryBikeRepository()
const stationRepository = createInMemoryStationRepository()

const queries = createInMemoryRideEligibilityQueries({
  userRepository,
  bikeRepository,
  stationRepository,
})

const checkRideEligibility = createCheckRideEligibility({
  userRepository,
  bikeRepository,
  stationRepository,
})

export const rideEligibilityModule: RideEligibilityModule = {
  queries,
  checkRideEligibility,
}
