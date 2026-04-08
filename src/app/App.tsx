import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { rideEligibilityModule } from '@/ride-elegibility/index'
import { RideEligibilityProvider } from '@/ride-elegibility/presentation/context/RideEligibilityContext'
import { RideEligibilityPage } from '@/ride-elegibility/presentation/pages/RideEligibilityPage'

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
