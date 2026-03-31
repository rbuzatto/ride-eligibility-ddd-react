import type { BikeType } from './BikeType'

export type PlanType = 'Basic' | 'Premium'

export function supportsBikeType(plan: PlanType, bikeType: BikeType): boolean {
  if (plan === 'Premium') return true
  return bikeType === 'Standard'
}
