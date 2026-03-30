import { createContext, type ReactNode, useContext } from 'react'
import type { BikeRepository } from '../../application/ports/BikeRepository'
import type { StationRepository } from '../../application/ports/StationRepository'
import type { UserRepository } from '../../application/ports/UserRepository'
import type {
  CheckRideEligibilityCommand,
  CheckRideEligibilityResult,
} from '../../application/use-cases/CheckRideEligibility'

export type RideEligibilityModule = {
  userRepository: UserRepository
  bikeRepository: BikeRepository
  stationRepository: StationRepository
  checkRideEligibility: {
    execute(command: CheckRideEligibilityCommand): CheckRideEligibilityResult
  }
}

const RideEligibilityContext = createContext<RideEligibilityModule | null>(null)

export function RideEligibilityProvider({
  module,
  children,
}: {
  module: RideEligibilityModule
  children: ReactNode
}) {
  return <RideEligibilityContext value={module}>{children}</RideEligibilityContext>
}

export function useRideEligibilityModule(): RideEligibilityModule {
  const ctx = useContext(RideEligibilityContext)
  if (!ctx) {
    throw new Error('useRideEligibilityModule must be used within RideEligibilityProvider')
  }
  return ctx
}
