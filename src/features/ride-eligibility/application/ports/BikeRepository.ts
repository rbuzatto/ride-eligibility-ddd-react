import type { Bike } from '../../domain/entities/Bike'

export type BikeRepository = {
  findById(id: string): Promise<Bike | null>
  findAll(): Promise<Bike[]>
}
