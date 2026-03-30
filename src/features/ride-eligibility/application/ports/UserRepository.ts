import type { User } from '../../domain/entities/User'

export type UserRepository = {
  findById(id: string): User | null
  findAll(): User[]
}
