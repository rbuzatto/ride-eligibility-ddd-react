import type { Bike } from '../../domain/entities/Bike'

export type BikeRepository = {
  findById(id: string): Bike | null
  findAll(): Bike[]
}
