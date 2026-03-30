import type { Station } from '../../domain/entities/Station'

export const stations: Station[] = [
  {
    id: 'station-1',
    name: 'Praça da Liberdade',
    isPickupAllowed: true,
  },
  {
    id: 'station-2',
    name: 'Estação Central',
    isPickupAllowed: false,
  },
]
