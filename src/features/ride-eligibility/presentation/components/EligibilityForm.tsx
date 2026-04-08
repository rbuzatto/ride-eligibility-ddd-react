import type { Bike } from '@/ride-elegibility/domain/entities/Bike'
import type { Station } from '@/ride-elegibility/domain/entities/Station'
import type { User } from '@/ride-elegibility/domain/entities/User'
import { Button } from '@/shared/ui/button'
import { Label } from '@/shared/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'

type EligibilityFormProps = {
  users: User[]
  bikes: Bike[]
  stations: Station[]
  selectedUserId: string
  selectedBikeId: string
  selectedStationId: string
  onUserChange: (id: string | null) => void
  onBikeChange: (id: string | null) => void
  onStationChange: (id: string | null) => void
  onCheckEligibility: () => void
  canCheckEligibility: boolean
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
  onCheckEligibility,
  canCheckEligibility,
}: EligibilityFormProps) {
  const selectedUserLabel = users.find((user) => user.id === selectedUserId)?.name ?? null
  const selectedBikeLabel = bikes.find((bike) => bike.id === selectedBikeId)?.model ?? null
  const selectedStationLabel =
    stations.find((station) => station.id === selectedStationId)?.name ?? null

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onCheckEligibility()
      }}
      className="flex flex-col gap-4"
    >
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="user-select">User</Label>
        <Select
          key={selectedUserId || 'empty-user'}
          value={selectedUserId || undefined}
          onValueChange={onUserChange}
        >
          <SelectTrigger id="user-select" className="w-full">
            <SelectValue placeholder="Select a user">{selectedUserLabel}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            {users.map((user) => (
              <SelectItem key={user.id} value={user.id}>
                {user.name} ({user.planType} — {user.accountStatus})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="bike-select">Bike</Label>
        <Select
          key={selectedBikeId || 'empty-bike'}
          value={selectedBikeId || undefined}
          onValueChange={onBikeChange}
        >
          <SelectTrigger id="bike-select" className="w-full">
            <SelectValue placeholder="Select a bike">{selectedBikeLabel}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            {bikes.map((bike) => (
              <SelectItem key={bike.id} value={bike.id}>
                {bike.model} ({bike.bikeType} — {bike.availabilityStatus})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="station-select">Station</Label>
        <Select
          key={selectedStationId || 'empty-station'}
          value={selectedStationId || undefined}
          onValueChange={onStationChange}
        >
          <SelectTrigger id="station-select" className="w-full">
            <SelectValue placeholder="Select a station">{selectedStationLabel}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            {stations.map((station) => (
              <SelectItem key={station.id} value={station.id}>
                {station.name} ({station.pickupPolicy})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" disabled={!canCheckEligibility}>
        Check Eligibility
      </Button>
    </form>
  )
}
