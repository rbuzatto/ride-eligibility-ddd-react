import type { Bike } from '../../domain/entities/Bike'
import type { Station } from '../../domain/entities/Station'
import type { User } from '../../domain/entities/User'

export type RideEligibilityQueries = {
  getUsers(): Promise<User[]>
  getBikes(): Promise<Bike[]>
  getStations(): Promise<Station[]>
}
