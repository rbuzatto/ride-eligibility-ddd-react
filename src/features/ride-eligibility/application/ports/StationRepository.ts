import type { Station } from '../../domain/entities/Station'

export type StationRepository = {
  findById(id: string): Promise<Station | null>
  findAll(): Promise<Station[]>
}
