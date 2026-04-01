import { useMutation, useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useRideEligibilityModule } from '../context/RideEligibilityContext'
import type { EligibilityCheckViewModel } from '../view-models/EligibilityViewModel'
import { mapToEligibilityViewModel } from '../view-models/mapToEligibilityViewModel'

export function useRideEligibility() {
  const { queries, checkRideEligibility } = useRideEligibilityModule()

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

  const [selectedUserId, setSelectedUserId] = useState('')
  const [selectedBikeId, setSelectedBikeId] = useState('')
  const [selectedStationId, setSelectedStationId] = useState('')
  const [viewModel, setViewModel] = useState<EligibilityCheckViewModel>({ status: 'idle' })

  const checkMutation = useMutation({
    mutationFn: () =>
      checkRideEligibility.execute({
        userId: selectedUserId,
        bikeId: selectedBikeId,
        stationId: selectedStationId,
        requestedAt: new Date(),
      }),
    onSuccess: (result) => {
      setViewModel(mapToEligibilityViewModel(result))
    },
  })

  const isLoading = usersQuery.isLoading || bikesQuery.isLoading || stationsQuery.isLoading
  const isError = usersQuery.isError || bikesQuery.isError || stationsQuery.isError

  const canSubmit =
    selectedUserId !== '' &&
    selectedBikeId !== '' &&
    selectedStationId !== '' &&
    !checkMutation.isPending

  function handleCheck() {
    checkMutation.mutate()
  }

  function handleReset() {
    setSelectedUserId('')
    setSelectedBikeId('')
    setSelectedStationId('')
    setViewModel({ status: 'idle' })
    checkMutation.reset()
  }

  function handleUserChange(id: string | null) {
    setSelectedUserId(id ?? '')
  }

  function handleBikeChange(id: string | null) {
    setSelectedBikeId(id ?? '')
  }

  function handleStationChange(id: string | null) {
    setSelectedStationId(id ?? '')
  }

  return {
    users: usersQuery.data ?? [],
    bikes: bikesQuery.data ?? [],
    stations: stationsQuery.data ?? [],
    isLoading,
    isError,
    selectedUserId,
    selectedBikeId,
    selectedStationId,
    setSelectedUserId: handleUserChange,
    setSelectedBikeId: handleBikeChange,
    setSelectedStationId: handleStationChange,
    canSubmit,
    viewModel,
    isPending: checkMutation.isPending,
    handleCheck,
    handleReset,
  }
}
