import { useState } from 'react'
import type { Bike } from '@/ride-elegibility/domain/entities/Bike'
import type { Station } from '@/ride-elegibility/domain/entities/Station'
import type { User } from '@/ride-elegibility/domain/entities/User'

type UseRideEligibilitySelectionParams = {
  users: User[]
  bikes: Bike[]
  stations: Station[]
}

export function useRideEligibilityForm({
  users,
  bikes,
  stations,
}: UseRideEligibilitySelectionParams) {
  const [selectedUserId, setSelectedUserId] = useState('')
  const [selectedBikeId, setSelectedBikeId] = useState('')
  const [selectedStationId, setSelectedStationId] = useState('')

  const selectedUser = users.find((user) => user.id === selectedUserId) ?? null
  const selectedBike = bikes.find((bike) => bike.id === selectedBikeId) ?? null
  const selectedStation = stations.find((station) => station.id === selectedStationId) ?? null
  const canCheckEligibility =
    selectedUser !== null && selectedBike !== null && selectedStation !== null

  function resetSelection() {
    setSelectedUserId('')
    setSelectedBikeId('')
    setSelectedStationId('')
  }

  return {
    user: selectedUser,
    bike: selectedBike,
    station: selectedStation,
    canCheckEligibility,
    setUserId: setSelectedUserId,
    setBikeId: setSelectedBikeId,
    setStationId: setSelectedStationId,
    resetSelection,
  }
}
