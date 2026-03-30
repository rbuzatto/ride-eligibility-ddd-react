import { CheckCircle, XCircle } from 'lucide-react'
import { Alert, AlertTitle } from '@/shared/ui/alert'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
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
      <Card role="status" aria-label="Eligibility result">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-600">
            <CheckCircle className="size-5" />
            Ride Allowed
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            All eligibility checks passed. The ride can start.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card role="status" aria-label="Eligibility result">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-destructive">
          <XCircle className="size-5" />
          Ride Blocked
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {result.reasons.map((reason) => (
          <Alert key={reason} variant="destructive">
            <AlertTitle>{blockReasonLabels[reason] ?? reason}</AlertTitle>
          </Alert>
        ))}
      </CardContent>
    </Card>
  )
}
