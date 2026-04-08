import { type Bike, checkBikeAvailability } from '@/ride-elegibility/domain/entities/Bike'
import { checkPickupEligibility, type Station } from '@/ride-elegibility/domain/entities/Station'
import {
  checkAccountEligibility,
  checkOperationalRideEligibility,
  checkRideStartAvailability,
  type User,
} from '@/ride-elegibility/domain/entities/User'
import type { EligibilityResult } from '@/ride-elegibility/domain/results/EligibilityResult'
import type { BlockReason } from '@/ride-elegibility/domain/value-objects/BlockReason'
import { checkPlanCompatibility } from '@/ride-elegibility/domain/value-objects/PlanType'

export function checkEligibility(user: User, bike: Bike, station: Station): EligibilityResult {
  const reasons: BlockReason[] = [
    checkAccountEligibility(user),
    checkOperationalRideEligibility(user),
    checkRideStartAvailability(user),
    checkBikeAvailability(bike),
    checkPlanCompatibility(user.planType, bike.bikeType),
    checkPickupEligibility(station),
  ].filter((reason): reason is BlockReason => reason !== null)

  const evaluatedAt = new Date()

  if (reasons.length === 0) {
    return { eligible: true, evaluatedAt }
  }

  return {
    eligible: false,
    reasons,
    hardBlocks: reasons.filter((r) => r.severity === 'Hard'),
    softBlocks: reasons.filter((r) => r.severity === 'Soft'),
    evaluatedAt,
  }
}
