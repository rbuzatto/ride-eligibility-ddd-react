import { type Bike, checkBikeAvailability } from '../entities/Bike'
import { checkPickupEligibility, type Station } from '../entities/Station'
import {
  checkAccountEligibility,
  checkOperationalRideEligibility,
  checkRideStartAvailability,
  type User,
} from '../entities/User'
import type { EligibilityResult } from '../results/EligibilityResult'
import type { BlockReason } from '../value-objects/BlockReason'
import { checkPlanCompatibility } from '../value-objects/PlanType'

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
