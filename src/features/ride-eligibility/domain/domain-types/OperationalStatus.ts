export type OperationalStatus = 'Clear' | 'Blocked' | 'UnderReview'

export function allowsRideStart(status: OperationalStatus): boolean {
  return status === 'Clear'
}
