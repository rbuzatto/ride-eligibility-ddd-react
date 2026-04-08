import { type AccountStatus, isActive } from '@/ride-elegibility/domain/domain-types/AccountStatus'
import {
  allowsRideStart,
  type OperationalStatus,
} from '@/ride-elegibility/domain/domain-types/OperationalStatus'
import { type BlockReason, blockReasons } from '@/ride-elegibility/domain/value-objects/BlockReason'
import type { PlanType } from '@/ride-elegibility/domain/value-objects/PlanType'

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

export function checkAccountEligibility(user: User): BlockReason | null {
  return !isAccountActive(user) ? blockReasons.inactiveAccount() : null
}

export function checkOperationalRideEligibility(user: User): BlockReason | null {
  return hasOperationalRestriction(user) ? blockReasons.operationalBlock() : null
}

export function checkRideStartAvailability(user: User): BlockReason | null {
  return user.hasRideInProgress ? blockReasons.rideInProgress() : null
}
