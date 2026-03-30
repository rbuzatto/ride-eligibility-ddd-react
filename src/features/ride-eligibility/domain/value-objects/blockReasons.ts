import type { BlockReason } from './BlockReason'

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
