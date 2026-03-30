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

  return {
    users,
    bikes,
    stations,
    selectedUserId,
    selectedBikeId,
    selectedStationId,
    setSelectedUserId,
    setSelectedBikeId,
    setSelectedStationId,
    canSubmit,
    result,
    error,
    handleCheck,
    handleReset,
  }
}
