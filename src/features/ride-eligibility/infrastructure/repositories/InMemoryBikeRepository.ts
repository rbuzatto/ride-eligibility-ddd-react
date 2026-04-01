import type { BikeRepository } from '../../application/ports/BikeRepository'
import { bikes } from '../data/bikes'
import { delay } from './delay'

export function createInMemoryBikeRepository(): BikeRepository {
  return {
    async findById(id: string) {
      await delay(80)
      return bikes.find((bike) => bike.id === id) ?? null
    },
    async findAll() {
      await delay(150)
      return [...bikes]
    },
  }
}
