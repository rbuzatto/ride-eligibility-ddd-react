import type { Bike } from '@/ride-elegibility/domain/entities/Bike'

export type BikeRepository = {
  findById(id: string): Promise<Bike | null>
  findAll(): Promise<Bike[]>
}
