import type { Station } from '@/ride-elegibility/domain/entities/Station'

export const stations: Station[] = [
  {
    id: 'station-1',
    name: 'Praça da Liberdade',
    pickupPolicy: 'Allowed',
  },
  {
    id: 'station-2',
    name: 'Estação Central',
    pickupPolicy: 'Suspended',
  },
  {
    id: 'station-3',
    name: 'Parque Municipal',
    pickupPolicy: 'ClosedForMaintenance',
  },
]
