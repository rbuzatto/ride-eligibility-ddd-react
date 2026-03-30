import type { Bike } from '../../domain/entities/Bike'
import type { Station } from '../../domain/entities/Station'
import type { User } from '../../domain/entities/User'

type EligibilityFormProps = {
  users: User[]
  bikes: Bike[]
  stations: Station[]
  selectedUserId: string
  selectedBikeId: string
  selectedStationId: string
  onUserChange: (id: string) => void
  onBikeChange: (id: string) => void
  onStationChange: (id: string) => void
  onSubmit: () => void
  canSubmit: boolean
}

export function EligibilityForm({
  users,
  bikes,
  stations,
  selectedUserId,
  selectedBikeId,
  selectedStationId,
  onUserChange,
  onBikeChange,
  onStationChange,
  onSubmit,
  canSubmit,
}: EligibilityFormProps) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit()
      }}
    >
      <div>
        <label htmlFor="user-select">User</label>
        <select
          id="user-select"
          value={selectedUserId}
          onChange={(e) => onUserChange(e.target.value)}
        >
          <option value="">Select a user</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name} ({user.planType} — {user.accountStatus})
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="bike-select">Bike</label>
        <select
          id="bike-select"
          value={selectedBikeId}
          onChange={(e) => onBikeChange(e.target.value)}
        >
          <option value="">Select a bike</option>
          {bikes.map((bike) => (
            <option key={bike.id} value={bike.id}>
              {bike.model} ({bike.bikeType} — {bike.availabilityStatus})
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="station-select">Station</label>
        <select
          id="station-select"
          value={selectedStationId}
          onChange={(e) => onStationChange(e.target.value)}
        >
          <option value="">Select a station</option>
          {stations.map((station) => (
            <option key={station.id} value={station.id}>
              {station.name} ({station.isPickupAllowed ? 'Pickup allowed' : 'Pickup not allowed'})
            </option>
          ))}
        </select>
      </div>

      <button type="submit" disabled={!canSubmit}>
        Check Eligibility
      </button>
    </form>
  )
}
