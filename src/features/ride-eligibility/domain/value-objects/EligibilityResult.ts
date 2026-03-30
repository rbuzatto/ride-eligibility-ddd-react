import type { BlockReason } from './BlockReason'

export type EligibilityResult = { eligible: true } | { eligible: false; reasons: BlockReason[] }
