import type { CheckRideEligibilityResult } from '@/ride-elegibility/application/use-cases/CheckRideEligibility'
import type { BlockReason } from '@/ride-elegibility/domain/value-objects/BlockReason'
import type {
  BlockReasonView,
  EligibilityCheckViewModel,
} from '@/ride-elegibility/presentation/view-models/EligibilityViewModel'

function mapBlockReason(reason: BlockReason): BlockReasonView {
  return {
    code: reason.code,
    label: reason.message,
    severity: reason.severity === 'Hard' ? 'hard' : 'soft',
    category: reason.category,
  }
}

export function mapToEligibilityViewModel(
  result: CheckRideEligibilityResult | null,
): EligibilityCheckViewModel {
  if (result === null) {
    return { status: 'idle' }
  }

  if (result.outcome === 'entity_not_found') {
    return {
      status: 'system_error',
      message: `${result.entity} not found (id: ${result.id})`,
    }
  }

  const { result: eligibility } = result

  if (eligibility.eligible) {
    return {
      status: 'eligible',
      evaluatedAt: eligibility.evaluatedAt.toLocaleTimeString(),
    }
  }

  return {
    status: 'ineligible',
    hardBlocks: eligibility.hardBlocks.map(mapBlockReason),
    softBlocks: eligibility.softBlocks.map(mapBlockReason),
    evaluatedAt: eligibility.evaluatedAt.toLocaleTimeString(),
  }
}
