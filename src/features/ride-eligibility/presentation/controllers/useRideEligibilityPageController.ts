import { useState } from 'react'
import type { CheckRideEligibilityResult } from '@/ride-elegibility/application/use-cases/CheckRideEligibility'
import { useRideEligibilityModule } from '@/ride-elegibility/presentation/context/RideEligibilityContext'
import { useRideEligibilityOptionsQuery } from '@/ride-elegibility/presentation/queries/useRideEligibilityOptionsQuery'
import { mapToEligibilityViewModel } from '@/ride-elegibility/presentation/view-models/mapToEligibilityViewModel'

export function useRideEligibilityPageController() {
  const { checkRideEligibility } = useRideEligibilityModule()
  const { users, bikes, stations, isLoading, isError } = useRideEligibilityOptionsQuery()

  const [selectedUserId, setSelectedUserId] = useState('')
  const [selectedBikeId, setSelectedBikeId] = useState('')
  const [selectedStationId, setSelectedStationId] = useState('')
  const [lastEvaluation, setLastEvaluation] = useState<CheckRideEligibilityResult | null>(null)

  const viewModel = mapToEligibilityViewModel(lastEvaluation)

  function clearEvaluation() {
    setLastEvaluation(null)
  }

  async function checkEligibilityForSelection() {
    const result = await checkRideEligibility.execute({
      user: users.find((user) => user.id === selectedUserId) ?? null,
      bike: bikes.find((bike) => bike.id === selectedBikeId) ?? null,
      station: stations.find((station) => station.id === selectedStationId) ?? null,
    })

    setLastEvaluation(result)
  }

  function resetForm() {
    setSelectedUserId('')
    setSelectedBikeId('')
    setSelectedStationId('')
    clearEvaluation()
  }

  function selectUser(id: string | null) {
    clearEvaluation()
    setSelectedUserId(id ?? '')
  }

  function selectBike(id: string | null) {
    clearEvaluation()
    setSelectedBikeId(id ?? '')
  }

  function selectStation(id: string | null) {
    clearEvaluation()
    setSelectedStationId(id ?? '')
  }

  return {
    options: {
      users,
      bikes,
      stations,
    },
    loadState: {
      isLoading,
      isError,
    },
    selection: {
      userId: selectedUserId,
      bikeId: selectedBikeId,
      stationId: selectedStationId,
      selectUser,
      selectBike,
      selectStation,
    },
    evaluation: {
      viewModel,
      canCheckEligibility:
        selectedUserId !== '' && selectedBikeId !== '' && selectedStationId !== '',
      hasResult: viewModel.status !== 'idle',
    },
    actions: {
      checkEligibilityForSelection,
      resetForm,
    },
  }
}
