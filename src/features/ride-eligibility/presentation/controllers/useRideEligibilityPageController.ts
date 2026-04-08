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

  const selectedUser = users.find((user) => user.id === selectedUserId) ?? null
  const selectedBike = bikes.find((bike) => bike.id === selectedBikeId) ?? null
  const selectedStation = stations.find((station) => station.id === selectedStationId) ?? null
  const canCheckEligibility = selectedUser !== null && selectedBike !== null && selectedStation !== null
  const [eligibilityResult, setEligibilityResult] = useState<CheckRideEligibilityResult | null>(null)

  const viewModel = mapToEligibilityViewModel(eligibilityResult)

  function resetEligibilityResult() {
    setEligibilityResult(null)
  }

  async function checkEligibilityForSelection() {
    const result = await checkRideEligibility.execute({
      user: selectedUser,
      bike: selectedBike,
      station: selectedStation,
    })

    setEligibilityResult(result)
  }

  function resetForm() {
    setSelectedUserId('')
    setSelectedBikeId('')
    setSelectedStationId('')
    resetEligibilityResult()
  }

  function selectUser(id: string | null) {
    resetEligibilityResult()
    setSelectedUserId(id ?? '')
  }

  function selectBike(id: string | null) {
    resetEligibilityResult()
    setSelectedBikeId(id ?? '')
  }

  function selectStation(id: string | null) {
    resetEligibilityResult()
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
      canCheckEligibility,
      hasResult: viewModel.status !== 'idle',
    },
    actions: {
      checkEligibilityForSelection,
      resetForm,
    },
  }
}
