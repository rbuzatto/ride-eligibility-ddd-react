import type { BikeRepository } from '../../application/ports/BikeRepository'
import { bikes } from '../data/bikes'

export function createInMemoryBikeRepository(): BikeRepository {
  return {
    findById(id: string) {
      return bikes.find((bike) => bike.id === id) ?? null
    },
    findAll() {
      return [...bikes]
    },
  }
}
