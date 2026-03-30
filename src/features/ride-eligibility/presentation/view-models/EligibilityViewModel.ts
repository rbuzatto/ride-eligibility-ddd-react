export type BlockReasonView = {
  readonly code: string
  readonly label: string
  readonly severity: 'hard' | 'soft'
  readonly category: string
}

export type EligibilityCheckViewModel =
  | { status: 'idle' }
  | { status: 'eligible'; evaluatedAt: string }
  | {
      status: 'ineligible'
      hardBlocks: readonly BlockReasonView[]
      softBlocks: readonly BlockReasonView[]
      evaluatedAt: string
    }
  | { status: 'system_error'; message: string }
