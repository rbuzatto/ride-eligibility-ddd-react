export type BikeAvailabilityStatus = 'Available' | 'Unavailable'

export function isAvailable(status: BikeAvailabilityStatus): boolean {
  return status === 'Available'
}
