import type { BlockReason } from './BlockReason'

export type EligibleResult = {
  readonly eligible: true
  readonly evaluatedAt: Date
}

export type IneligibleResult = {
  readonly eligible: false
  readonly reasons: readonly BlockReason[]
  readonly hardBlocks: readonly BlockReason[]
  readonly softBlocks: readonly BlockReason[]
  readonly evaluatedAt: Date
}

export type EligibilityResult = EligibleResult | IneligibleResult
