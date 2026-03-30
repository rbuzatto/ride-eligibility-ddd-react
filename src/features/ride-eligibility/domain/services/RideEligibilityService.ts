import type { Bike } from '../entities/Bike'
import type { Station } from '../entities/Station'
import type { User } from '../entities/User'
import { ensureActiveAccount } from '../rules/ensureActiveAccount'
import { ensureBikeIsAvailable } from '../rules/ensureBikeIsAvailable'
import { ensureNoOperationalBlock } from '../rules/ensureNoOperationalBlock'
import { ensureNoRideInProgress } from '../rules/ensureNoRideInProgress'
import { ensurePickupIsAllowed } from '../rules/ensurePickupIsAllowed'
import { ensurePlanCompatibility } from '../rules/ensurePlanCompatibility'
import type { BlockReason } from '../value-objects/BlockReason'
import type { EligibilityResult } from '../value-objects/EligibilityResult'

export function checkEligibility(user: User, bike: Bike, station: Station): EligibilityResult {
  const reasons: BlockReason[] = [
    ensureActiveAccount(user),
    ensureNoOperationalBlock(user),
    ensureNoRideInProgress(user),
    ensureBikeIsAvailable(bike),
    ensurePlanCompatibility(user, bike),
    ensurePickupIsAllowed(station),
  ].filter((reason): reason is BlockReason => reason !== null)

  if (reasons.length === 0) {
    return { eligible: true }
  }

  return { eligible: false, reasons }
}
