import type { UserRepository } from '@/ride-elegibility/application/ports/UserRepository'
import { users } from '@/ride-elegibility/infrastructure/data/users'
import { delay } from './delay'

export function createInMemoryUserRepository(): UserRepository {
  return {
    async findById(id: string) {
      await delay(80)
      return users.find((user) => user.id === id) ?? null
    },
    async findAll() {
      await delay(150)
      return [...users]
    },
  }
}
