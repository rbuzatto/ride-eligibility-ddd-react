import type { UserRepository } from '../../application/ports/UserRepository'
import { users } from '../data/users'

export function createInMemoryUserRepository(): UserRepository {
  return {
    findById(id: string) {
      return users.find((user) => user.id === id) ?? null
    },
    findAll() {
      return [...users]
    },
  }
}
