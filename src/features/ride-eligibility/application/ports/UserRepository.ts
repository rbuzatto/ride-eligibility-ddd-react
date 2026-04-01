import type { User } from '../../domain/entities/User'

export type UserRepository = {
  findById(id: string): Promise<User | null>
  findAll(): Promise<User[]>
}
