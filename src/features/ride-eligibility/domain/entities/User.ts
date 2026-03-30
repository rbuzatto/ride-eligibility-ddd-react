import type { AccountStatus } from '../value-objects/AccountStatus'
import type { OperationalStatus } from '../value-objects/OperationalStatus'
import type { PlanType } from '../value-objects/PlanType'

export type User = {
  readonly id: string
  readonly name: string
  readonly accountStatus: AccountStatus
  readonly operationalStatus: OperationalStatus
  readonly hasRideInProgress: boolean
  readonly planType: PlanType
}
