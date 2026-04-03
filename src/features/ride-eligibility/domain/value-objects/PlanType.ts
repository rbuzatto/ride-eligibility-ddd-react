import type { BikeType } from '../domain-types/BikeType'
import { type BlockReason, blockReasons } from './BlockReason'

export type PlanType = 'Basic' | 'Premium'

export function supportsBikeType(plan: PlanType, bikeType: BikeType): boolean {
  if (plan === 'Premium') return true
  return bikeType === 'Standard'
}

export function checkPlanCompatibility(plan: PlanType, bikeType: BikeType): BlockReason | null {
  return !supportsBikeType(plan, bikeType) ? blockReasons.planNotCompatible() : null
}
