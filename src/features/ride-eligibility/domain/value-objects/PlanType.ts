import type { BikeType } from './BikeType'
import type { BlockReason } from './BlockReason'
import { blockReasons } from './blockReasons'

export type PlanType = 'Basic' | 'Premium'

export function supportsBikeType(plan: PlanType, bikeType: BikeType): boolean {
  if (plan === 'Premium') return true
  return bikeType === 'Standard'
}

export function checkPlanCompatibility(plan: PlanType, bikeType: BikeType): BlockReason | null {
  return !supportsBikeType(plan, bikeType) ? blockReasons.planNotCompatible() : null
}
