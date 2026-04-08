import type { Bike } from '@/ride-elegibility/domain/entities/Bike'
import type { Station } from '@/ride-elegibility/domain/entities/Station'
import type { User } from '@/ride-elegibility/domain/entities/User'
import type { EligibilityResult } from '@/ride-elegibility/domain/results/EligibilityResult'
import { checkEligibility } from '@/ride-elegibility/domain/services/RideEligibilityService'

export type CheckRideEligibilityCommand = {
  readonly user: User | null
  readonly bike: Bike | null
  readonly station: Station | null
}

export type CheckRideEligibilityResult =
  | { outcome: 'decided'; result: EligibilityResult }
  | { outcome: 'entity_not_found'; entity: 'User' | 'Bike' | 'Station'; id: string }

export const checkRideEligibility = {
  async execute(command: CheckRideEligibilityCommand): Promise<CheckRideEligibilityResult> {
    if (!command.user) {
      return { outcome: 'entity_not_found', entity: 'User', id: 'selected-user' }
    }

    if (!command.bike) {
      return { outcome: 'entity_not_found', entity: 'Bike', id: 'selected-bike' }
    }

    if (!command.station) {
      return { outcome: 'entity_not_found', entity: 'Station', id: 'selected-station' }
    }

    const result = checkEligibility(command.user, command.bike, command.station)
    return { outcome: 'decided', result }
  },
}
