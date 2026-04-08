import type { User } from '@/ride-elegibility/domain/entities/User'

export type UserRepository = {
  findById(id: string): Promise<User | null>
  findAll(): Promise<User[]>
}
