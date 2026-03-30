import type { User } from '../../domain/entities/User'

export const users: User[] = [
  {
    id: 'user-1',
    name: 'Ana Silva',
    accountStatus: 'Active',
    isBlocked: false,
    hasRideInProgress: false,
    planType: 'Basic',
  },
  {
    id: 'user-2',
    name: 'Bruno Costa',
    accountStatus: 'Active',
    isBlocked: false,
    hasRideInProgress: false,
    planType: 'Premium',
  },
  {
    id: 'user-3',
    name: 'Carla Mendes',
    accountStatus: 'Inactive',
    isBlocked: false,
    hasRideInProgress: false,
    planType: 'Basic',
  },
  {
    id: 'user-4',
    name: 'Diego Rocha',
    accountStatus: 'Active',
    isBlocked: true,
    hasRideInProgress: false,
    planType: 'Premium',
  },
  {
    id: 'user-5',
    name: 'Elena Martins',
    accountStatus: 'Active',
    isBlocked: false,
    hasRideInProgress: true,
    planType: 'Basic',
  },
]
