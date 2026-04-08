import type { Station } from '@/ride-elegibility/domain/entities/Station'

export type StationRepository = {
  findById(id: string): Promise<Station | null>
  findAll(): Promise<Station[]>
}
