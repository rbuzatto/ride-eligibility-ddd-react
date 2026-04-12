import { useState } from 'react'
import type {
  CheckRideEligibilityCommand,
  CheckRideEligibilityResult,
} from '@/ride-elegibility/application/use-cases/CheckRideEligibility'
import { mapToEligibilityViewModel } from '@/ride-elegibility/presentation/view-models/mapToEligibilityViewModel'

type UseRideEligibilityEvaluationParams = {
  checkRideEligibility: {
    execute(command: CheckRideEligibilityCommand): Promise<CheckRideEligibilityResult>
  }
}

export function useCheckRideEligibility({
  checkRideEligibility,
}: UseRideEligibilityEvaluationParams) {
  const [eligibilityResult, setEligibilityResult] = useState<CheckRideEligibilityResult | null>(
    null,
  )

  const viewModel = mapToEligibilityViewModel(eligibilityResult)
  async function checkEligibilityForSelection(command: CheckRideEligibilityCommand) {
    const result = await checkRideEligibility.execute(command)
    setEligibilityResult(result)
  }

  function resetEvaluation() {
    setEligibilityResult(null)
  }

  return {
    viewModel,
    hasResult: viewModel.status !== 'idle',
    checkEligibilityForSelection,
    resetEvaluation,
  }
}
