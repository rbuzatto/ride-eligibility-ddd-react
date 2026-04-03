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

export const blockReasons = {
  inactiveAccount: (): BlockReason => ({
    code: 'InactiveAccount',
    category: 'Account',
    severity: 'Hard',
    message: 'Account is inactive',
  }),
  operationalBlock: (): BlockReason => ({
    code: 'OperationalBlock',
    category: 'Account',
    severity: 'Hard',
    message: 'User has an operational block',
  }),
  rideInProgress: (): BlockReason => ({
    code: 'RideInProgress',
    category: 'Ride',
    severity: 'Hard',
    message: 'User already has a ride in progress',
  }),
  bikeUnavailable: (): BlockReason => ({
    code: 'BikeUnavailable',
    category: 'Bike',
    severity: 'Hard',
    message: 'Bike is not available',
  }),
  planNotCompatible: (): BlockReason => ({
    code: 'PlanNotCompatible',
    category: 'Bike',
    severity: 'Soft',
    message: 'User plan does not support this bike type',
  }),
  pickupNotAllowed: (): BlockReason => ({
    code: 'PickupNotAllowed',
    category: 'Station',
    severity: 'Soft',
    message: 'Pickup is not available at this station',
  }),
} as const
