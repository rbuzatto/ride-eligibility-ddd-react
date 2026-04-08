import type { CheckRideEligibilityResult } from '@/ride-elegibility/application/use-cases/CheckRideEligibility'
import { mapToEligibilityViewModel } from '@/ride-elegibility/presentation/view-models/mapToEligibilityViewModel'

describe('mapToEligibilityViewModel', () => {
  it('returns idle when result is null', () => {
    expect(mapToEligibilityViewModel(null)).toEqual({ status: 'idle' })
  })

  it('returns system_error for entity_not_found outcome', () => {
    const result: CheckRideEligibilityResult = {
      outcome: 'entity_not_found',
      entity: 'User',
      id: 'unknown-id',
    }
    const vm = mapToEligibilityViewModel(result)
    expect(vm.status).toBe('system_error')
    if (vm.status === 'system_error') {
      expect(vm.message).toContain('User')
      expect(vm.message).toContain('unknown-id')
    }
  })

  it('returns eligible for decided outcome with eligible result', () => {
    const result: CheckRideEligibilityResult = {
      outcome: 'decided',
      result: { eligible: true, evaluatedAt: new Date('2026-03-30T12:00:00') },
    }
    const vm = mapToEligibilityViewModel(result)
    expect(vm.status).toBe('eligible')
    if (vm.status === 'eligible') {
      expect(vm.evaluatedAt).toBeTruthy()
    }
  })

  it('returns ineligible with partitioned blocks for decided outcome with ineligible result', () => {
    const result: CheckRideEligibilityResult = {
      outcome: 'decided',
      result: {
        eligible: false,
        reasons: [
          {
            code: 'InactiveAccount',
            category: 'Account',
            severity: 'Hard',
            message: 'Account is inactive',
          },
          {
            code: 'PlanNotCompatible',
            category: 'Bike',
            severity: 'Soft',
            message: 'Plan not compatible',
          },
        ],
        hardBlocks: [
          {
            code: 'InactiveAccount',
            category: 'Account',
            severity: 'Hard',
            message: 'Account is inactive',
          },
        ],
        softBlocks: [
          {
            code: 'PlanNotCompatible',
            category: 'Bike',
            severity: 'Soft',
            message: 'Plan not compatible',
          },
        ],
        evaluatedAt: new Date('2026-03-30T12:00:00'),
      },
    }
    const vm = mapToEligibilityViewModel(result)
    expect(vm.status).toBe('ineligible')
    if (vm.status === 'ineligible') {
      expect(vm.hardBlocks).toHaveLength(1)
      expect(vm.hardBlocks[0]).toEqual({
        code: 'InactiveAccount',
        label: 'Account is inactive',
        severity: 'hard',
        category: 'Account',
      })
      expect(vm.softBlocks).toHaveLength(1)
      expect(vm.softBlocks[0].severity).toBe('soft')
    }
  })
})
