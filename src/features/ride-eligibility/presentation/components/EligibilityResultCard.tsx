import { CheckCircle, ShieldAlert, TriangleAlert, XCircle } from 'lucide-react'
import { Alert, AlertTitle } from '@/shared/ui/alert'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import type { EligibilityCheckViewModel } from '../view-models/EligibilityViewModel'

type EligibilityResultCardProps = {
  viewModel: Extract<EligibilityCheckViewModel, { status: 'eligible' | 'ineligible' }>
}

export function EligibilityResultCard({ viewModel }: EligibilityResultCardProps) {
  if (viewModel.status === 'eligible') {
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
          <p className="mt-1 text-xs text-muted-foreground">Evaluated at {viewModel.evaluatedAt}</p>
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
        {viewModel.hardBlocks.length > 0 && (
          <div className="flex flex-col gap-2">
            {viewModel.hardBlocks.map((reason) => (
              <Alert key={reason.code} variant="destructive">
                <ShieldAlert className="size-4" />
                <AlertTitle>{reason.label}</AlertTitle>
              </Alert>
            ))}
          </div>
        )}
        {viewModel.softBlocks.length > 0 && (
          <div className="flex flex-col gap-2">
            {viewModel.softBlocks.map((reason) => (
              <Alert key={reason.code}>
                <TriangleAlert className="size-4" />
                <AlertTitle>{reason.label}</AlertTitle>
              </Alert>
            ))}
          </div>
        )}
        <p className="mt-1 text-xs text-muted-foreground">Evaluated at {viewModel.evaluatedAt}</p>
      </CardContent>
    </Card>
  )
}
