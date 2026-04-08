import { EligibilityForm } from '@/ride-elegibility/presentation/components/EligibilityForm'
import { EligibilityResultCard } from '@/ride-elegibility/presentation/components/EligibilityResultCard'
import { useRideEligibilityPageController } from '@/ride-elegibility/presentation/controllers/useRideEligibilityPageController'
import { Alert, AlertDescription, AlertTitle } from '@/shared/ui/alert'
import { Button } from '@/shared/ui/button'

export function RideEligibilityPage() {
  const { options, loadState, selection, evaluation, actions } = useRideEligibilityPageController()

  if (loadState.isLoading) {
    return (
      <main className="min-h-screen bg-background px-4 py-10">
        <div className="mx-auto w-full max-w-md">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </main>
    )
  }

  if (loadState.isError) {
    return (
      <main className="min-h-screen bg-background px-4 py-10">
        <div className="mx-auto w-full max-w-md">
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>Failed to load data. Please try again.</AlertDescription>
          </Alert>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background px-4 py-10">
      <div className="mx-auto w-full max-w-md space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Ride Eligibility Check</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Select a user, bike, and station to verify eligibility.
          </p>
        </div>

        <EligibilityForm
          users={options.users}
          bikes={options.bikes}
          stations={options.stations}
          selectedUserId={selection.userId}
          selectedBikeId={selection.bikeId}
          selectedStationId={selection.stationId}
          onUserChange={selection.selectUser}
          onBikeChange={selection.selectBike}
          onStationChange={selection.selectStation}
          onCheckEligibility={actions.checkEligibilityForSelection}
          canCheckEligibility={evaluation.canCheckEligibility}
        />

        {evaluation.viewModel.status === 'system_error' && (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{evaluation.viewModel.message}</AlertDescription>
          </Alert>
        )}

        {(evaluation.viewModel.status === 'eligible' ||
          evaluation.viewModel.status === 'ineligible') && (
          <EligibilityResultCard viewModel={evaluation.viewModel} />
        )}

        {evaluation.hasResult && (
          <Button variant="outline" className="w-full" onClick={actions.resetForm}>
            Reset
          </Button>
        )}
      </div>
    </main>
  )
}
