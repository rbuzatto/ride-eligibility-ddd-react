import type { StationRepository } from '../../application/ports/StationRepository'
import { stations } from '../data/stations'

export function createInMemoryStationRepository(): StationRepository {
  return {
    findById(id: string) {
      return stations.find((station) => station.id === id) ?? null
    },
    findAll() {
      return [...stations]
    },
  }
}
