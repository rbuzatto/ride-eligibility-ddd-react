import { checkRideEligibility } from '@/ride-elegibility/application/use-cases/CheckRideEligibility'
import { createInMemoryRideEligibilityQueries } from '@/ride-elegibility/infrastructure/query-services/InMemoryRideEligibilityQueries'
import { createInMemoryBikeRepository } from '@/ride-elegibility/infrastructure/repositories/InMemoryBikeRepository'
import { createInMemoryStationRepository } from '@/ride-elegibility/infrastructure/repositories/InMemoryStationRepository'
import { createInMemoryUserRepository } from '@/ride-elegibility/infrastructure/repositories/InMemoryUserRepository'
import type { RideEligibilityModule } from '@/ride-elegibility/presentation/context/RideEligibilityContext'

const userRepository = createInMemoryUserRepository()
const bikeRepository = createInMemoryBikeRepository()
const stationRepository = createInMemoryStationRepository()

const queries = createInMemoryRideEligibilityQueries({
  userRepository,
  bikeRepository,
  stationRepository,
})

export const rideEligibilityModule: RideEligibilityModule = {
  queries,
  checkRideEligibility,
}
