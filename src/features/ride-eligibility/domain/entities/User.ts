import type { AccountStatus } from '../value-objects/AccountStatus'
import type { PlanType } from '../value-objects/PlanType'

export type User = {
  id: string
  name: string
  accountStatus: AccountStatus
  isBlocked: boolean
  hasRideInProgress: boolean
  planType: PlanType
}
