import { createCheckRideEligibility } from './application/use-cases/CheckRideEligibility'
import { createInMemoryBikeRepository } from './infrastructure/repositories/InMemoryBikeRepository'
import { createInMemoryStationRepository } from './infrastructure/repositories/InMemoryStationRepository'
import { createInMemoryUserRepository } from './infrastructure/repositories/InMemoryUserRepository'

const userRepository = createInMemoryUserRepository()
const bikeRepository = createInMemoryBikeRepository()
const stationRepository = createInMemoryStationRepository()

export const checkRideEligibility = createCheckRideEligibility({
  userRepository,
  bikeRepository,
  stationRepository,
})

export { bikeRepository, stationRepository, userRepository }
