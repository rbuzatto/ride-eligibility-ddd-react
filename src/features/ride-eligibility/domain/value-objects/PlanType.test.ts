import { supportsBikeType } from './PlanType'

describe('PlanType', () => {
  it('Premium supports Standard bike', () => {
    expect(supportsBikeType('Premium', 'Standard')).toBe(true)
  })

  it('Premium supports Electric bike', () => {
    expect(supportsBikeType('Premium', 'Electric')).toBe(true)
  })

  it('Basic supports Standard bike', () => {
    expect(supportsBikeType('Basic', 'Standard')).toBe(true)
  })

  it('Basic does not support Electric bike', () => {
    expect(supportsBikeType('Basic', 'Electric')).toBe(false)
  })
})
