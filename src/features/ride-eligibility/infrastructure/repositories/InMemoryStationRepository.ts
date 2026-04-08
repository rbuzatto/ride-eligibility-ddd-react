import type { StationRepository } from '@/ride-elegibility/application/ports/StationRepository'
import { stations } from '@/ride-elegibility/infrastructure/data/stations'
import { delay } from './delay'

export function createInMemoryStationRepository(): StationRepository {
  return {
    async findById(id: string) {
      await delay(80)
      return stations.find((station) => station.id === id) ?? null
    },
    async findAll() {
      await delay(150)
      return [...stations]
    },
  }
}
