export type BlockReasonCode =
  | 'InactiveAccount'
  | 'OperationalBlock'
  | 'RideInProgress'
  | 'BikeUnavailable'
  | 'PlanNotCompatible'
  | 'PickupNotAllowed'

export type BlockCategory = 'Account' | 'Ride' | 'Bike' | 'Station'

export type BlockSeverity = 'Hard' | 'Soft'

export type BlockReason = {
  readonly code: BlockReasonCode
  readonly category: BlockCategory
  readonly severity: BlockSeverity
  readonly message: string
}
