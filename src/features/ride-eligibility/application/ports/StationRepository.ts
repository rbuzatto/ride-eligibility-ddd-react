import type { Station } from '../../domain/entities/Station'

export type StationRepository = {
  findById(id: string): Station | null
  findAll(): Station[]
}
