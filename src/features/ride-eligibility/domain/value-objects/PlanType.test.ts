import { checkPlanCompatibility, supportsBikeType } from './PlanType'

describe('PlanType pure predicates', () => {
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

describe('PlanType eligibility evaluation', () => {
  it('checkPlanCompatibility returns null when plan supports bike type', () => {
    expect(checkPlanCompatibility('Premium', 'Electric')).toBeNull()
    expect(checkPlanCompatibility('Basic', 'Standard')).toBeNull()
  })

  it('checkPlanCompatibility returns PlanNotCompatible when Basic + Electric', () => {
    const result = checkPlanCompatibility('Basic', 'Electric')
    expect(result).toEqual(
      expect.objectContaining({ code: 'PlanNotCompatible', severity: 'Soft', category: 'Bike' }),
    )
  })
})
