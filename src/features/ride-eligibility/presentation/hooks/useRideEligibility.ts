import { useState } from 'react'
import type { EligibilityResult } from '../../domain/value-objects/EligibilityResult'
import {
  bikeRepository,
  checkRideEligibility,
  stationRepository,
  userRepository,
} from '../../index'

export function useRideEligibility() {
  const users = userRepository.findAll()
  const bikes = bikeRepository.findAll()
  const stations = stationRepository.findAll()

  const [selectedUserId, setSelectedUserId] = useState('')
  const [selectedBikeId, setSelectedBikeId] = useState('')
  const [selectedStationId, setSelectedStationId] = useState('')
  const [result, setResult] = useState<EligibilityResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const canSubmit = selectedUserId !== '' && selectedBikeId !== '' && selectedStationId !== ''

  function handleCheck() {
    setError(null)
    setResult(null)

    const outcome = checkRideEligibility.execute(selectedUserId, selectedBikeId, selectedStationId)

    if (outcome.success) {
      setResult(outcome.result)
    } else {
      setError(outcome.error)
    }
  }

  function handleReset() {
    setSelectedUserId('')
    setSelectedBikeId('')
    setSelectedStationId('')
    setResult(null)
    setError(null)
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
    result,
    error,
    handleCheck,
    handleReset,
  }
}
