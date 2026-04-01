import { createContext, type ReactNode, useContext } from 'react'
import type { RideEligibilityQueries } from '../../application/queries/RideEligibilityQueries'
import type {
  CheckRideEligibilityCommand,
  CheckRideEligibilityResult,
} from '../../application/use-cases/CheckRideEligibility'

export type RideEligibilityModule = {
  queries: RideEligibilityQueries
  checkRideEligibility: {
    execute(command: CheckRideEligibilityCommand): Promise<CheckRideEligibilityResult>
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
