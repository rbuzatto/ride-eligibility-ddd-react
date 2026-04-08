import type { Bike } from '@/ride-elegibility/domain/entities/Bike'
import type { Station } from '@/ride-elegibility/domain/entities/Station'
import type { User } from '@/ride-elegibility/domain/entities/User'

export type RideEligibilityQueries = {
  getUsers(): Promise<User[]>
  getBikes(): Promise<Bike[]>
  getStations(): Promise<Station[]>
}
