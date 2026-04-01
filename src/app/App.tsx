import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { rideEligibilityModule } from '../features/ride-eligibility'
import { RideEligibilityProvider } from '../features/ride-eligibility/presentation/context/RideEligibilityContext'
import { RideEligibilityPage } from '../features/ride-eligibility/presentation/pages/RideEligibilityPage'

const queryClient = new QueryClient()

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RideEligibilityProvider module={rideEligibilityModule}>
        <RideEligibilityPage />
      </RideEligibilityProvider>
    </QueryClientProvider>
  )
}
