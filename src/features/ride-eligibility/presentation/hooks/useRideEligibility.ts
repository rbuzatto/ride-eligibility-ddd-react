import { useState } from 'react'
import type { CheckRideEligibilityResult } from '../../application/use-cases/CheckRideEligibility'
import { useRideEligibilityModule } from '../context/RideEligibilityContext'
import type { EligibilityCheckViewModel } from '../view-models/EligibilityViewModel'
import { mapToEligibilityViewModel } from '../view-models/mapToEligibilityViewModel'

export function useRideEligibility() {
  const { userRepository, bikeRepository, stationRepository, checkRideEligibility } =
    useRideEligibilityModule()

  const users = userRepository.findAll()
  const bikes = bikeRepository.findAll()
  const stations = stationRepository.findAll()

  const [selectedUserId, setSelectedUserId] = useState('')
  const [selectedBikeId, setSelectedBikeId] = useState('')
  const [selectedStationId, setSelectedStationId] = useState('')
  const [viewModel, setViewModel] = useState<EligibilityCheckViewModel>({ status: 'idle' })

  const canSubmit = selectedUserId !== '' && selectedBikeId !== '' && selectedStationId !== ''

  function handleCheck() {
    const result: CheckRideEligibilityResult = checkRideEligibility.execute({
      userId: selectedUserId,
      bikeId: selectedBikeId,
      stationId: selectedStationId,
      requestedAt: new Date(),
    })

    setViewModel(mapToEligibilityViewModel(result))
  }

  function handleReset() {
    setSelectedUserId('')
    setSelectedBikeId('')
    setSelectedStationId('')
    setViewModel({ status: 'idle' })
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
    users,
    bikes,
    stations,
    selectedUserId,
    selectedBikeId,
    selectedStationId,
    setSelectedUserId: handleUserChange,
    setSelectedBikeId: handleBikeChange,
    setSelectedStationId: handleStationChange,
    canSubmit,
    viewModel,
    handleCheck,
    handleReset,
  }
}
