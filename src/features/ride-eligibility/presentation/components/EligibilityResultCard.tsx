import type { EligibilityResult } from '../../domain/value-objects/EligibilityResult'

type EligibilityResultCardProps = {
  result: EligibilityResult
}

const blockReasonLabels: Record<string, string> = {
  InactiveAccount: 'Account is inactive',
  OperationalBlock: 'User has an operational block',
  RideInProgress: 'User already has a ride in progress',
  BikeUnavailable: 'Bike is not available',
  PlanNotCompatible: 'User plan does not support this bike type',
  PickupNotAllowed: 'Pickup is not allowed at this station',
}

export function EligibilityResultCard({ result }: EligibilityResultCardProps) {
  if (result.eligible) {
    return (
      <div role="status" aria-label="Eligibility result">
        <h2>Ride Allowed</h2>
        <p>All eligibility checks passed. The ride can start.</p>
      </div>
    )
  }

  return (
    <div role="status" aria-label="Eligibility result">
      <h2>Ride Blocked</h2>
      <ul>
        {result.reasons.map((reason) => (
          <li key={reason}>{blockReasonLabels[reason] ?? reason}</li>
        ))}
      </ul>
    </div>
  )
}
