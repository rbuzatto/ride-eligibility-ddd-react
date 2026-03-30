import { Button } from '@/shared/ui/button'
import { Label } from '@/shared/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'
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
  onUserChange: (id: string | null) => void
  onBikeChange: (id: string | null) => void
  onStationChange: (id: string | null) => void
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
      className="flex flex-col gap-4"
    >
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="user-select">User</Label>
        <Select value={selectedUserId || undefined} onValueChange={onUserChange}>
          <SelectTrigger id="user-select" className="w-full">
            <SelectValue placeholder="Select a user" />
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
        <Select value={selectedBikeId || undefined} onValueChange={onBikeChange}>
          <SelectTrigger id="bike-select" className="w-full">
            <SelectValue placeholder="Select a bike" />
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
        <Select value={selectedStationId || undefined} onValueChange={onStationChange}>
          <SelectTrigger id="station-select" className="w-full">
            <SelectValue placeholder="Select a station" />
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

      <Button type="submit" disabled={!canSubmit}>
        Check Eligibility
      </Button>
    </form>
  )
}
