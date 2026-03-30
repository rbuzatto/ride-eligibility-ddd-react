import { rideEligibilityModule } from '../features/ride-eligibility'
import { RideEligibilityProvider } from '../features/ride-eligibility/presentation/context/RideEligibilityContext'
import { RideEligibilityPage } from '../features/ride-eligibility/presentation/pages/RideEligibilityPage'

export function App() {
  return (
    <RideEligibilityProvider module={rideEligibilityModule}>
      <RideEligibilityPage />
    </RideEligibilityProvider>
  )
}
