import { useQuery } from '@tanstack/react-query'
import { useRideEligibilityModule } from '@/ride-elegibility/presentation/context/RideEligibilityContext'

export function useRideEligibilityOptionsQuery() {
  const { queries } = useRideEligibilityModule()

  const usersQuery = useQuery({
    queryKey: ['ride-eligibility', 'users'],
    queryFn: () => queries.getUsers(),
  })

  const bikesQuery = useQuery({
    queryKey: ['ride-eligibility', 'bikes'],
    queryFn: () => queries.getBikes(),
  })

  const stationsQuery = useQuery({
    queryKey: ['ride-eligibility', 'stations'],
    queryFn: () => queries.getStations(),
  })

  return {
    users: usersQuery.data ?? [],
    bikes: bikesQuery.data ?? [],
    stations: stationsQuery.data ?? [],
    isLoading: usersQuery.isLoading || bikesQuery.isLoading || stationsQuery.isLoading,
    isError: usersQuery.isError || bikesQuery.isError || stationsQuery.isError,
  }
}
