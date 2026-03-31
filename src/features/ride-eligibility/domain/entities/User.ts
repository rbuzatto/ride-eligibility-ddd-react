import { type AccountStatus, isActive } from '../value-objects/AccountStatus'
import { allowsRideStart, type OperationalStatus } from '../value-objects/OperationalStatus'
import type { PlanType } from '../value-objects/PlanType'

export type User = {
  readonly id: string
  readonly name: string
  readonly accountStatus: AccountStatus
  readonly operationalStatus: OperationalStatus
  readonly hasRideInProgress: boolean
  readonly planType: PlanType
}

export function isAccountActive(user: User): boolean {
  return isActive(user.accountStatus)
}

export function hasOperationalRestriction(user: User): boolean {
  return !allowsRideStart(user.operationalStatus)
}

export function canStartNewRide(user: User): boolean {
  return isAccountActive(user) && !hasOperationalRestriction(user) && !user.hasRideInProgress
}
