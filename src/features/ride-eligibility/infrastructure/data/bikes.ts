import type { Bike } from '../../domain/entities/Bike'

export const bikes: Bike[] = [
  {
    id: 'bike-1',
    model: 'City Cruiser',
    bikeType: 'Standard',
    availabilityStatus: 'Available',
  },
  {
    id: 'bike-2',
    model: 'Volt Pro',
    bikeType: 'Electric',
    availabilityStatus: 'Available',
  },
  {
    id: 'bike-3',
    model: 'Urban Glide',
    bikeType: 'Standard',
    availabilityStatus: 'Unavailable',
  },
]
