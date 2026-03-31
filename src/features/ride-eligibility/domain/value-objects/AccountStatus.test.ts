import { isActive } from './AccountStatus'

describe('AccountStatus', () => {
  it('isActive returns true for Active', () => {
    expect(isActive('Active')).toBe(true)
  })

  it('isActive returns false for Inactive', () => {
    expect(isActive('Inactive')).toBe(false)
  })
})
