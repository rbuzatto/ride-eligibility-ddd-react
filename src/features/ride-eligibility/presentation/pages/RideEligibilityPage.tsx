import { Alert, AlertDescription, AlertTitle } from '@/shared/ui/alert'
import { Button } from '@/shared/ui/button'
import { EligibilityForm } from '../components/EligibilityForm'
import { EligibilityResultCard } from '../components/EligibilityResultCard'
import { useRideEligibility } from '../hooks/useRideEligibility'

export function RideEligibilityPage() {
  const {
    users,
    bikes,
    stations,
    selectedUserId,
    selectedBikeId,
    selectedStationId,
    setSelectedUserId,
    setSelectedBikeId,
    setSelectedStationId,
    canSubmit,
    viewModel,
    handleCheck,
    handleReset,
  } = useRideEligibility()

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
          users={users}
          bikes={bikes}
          stations={stations}
          selectedUserId={selectedUserId}
          selectedBikeId={selectedBikeId}
          selectedStationId={selectedStationId}
          onUserChange={setSelectedUserId}
          onBikeChange={setSelectedBikeId}
          onStationChange={setSelectedStationId}
          onSubmit={handleCheck}
          canSubmit={canSubmit}
        />

        {viewModel.status === 'system_error' && (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{viewModel.message}</AlertDescription>
          </Alert>
        )}

        {(viewModel.status === 'eligible' || viewModel.status === 'ineligible') && (
          <EligibilityResultCard viewModel={viewModel} />
        )}

        {viewModel.status !== 'idle' && (
          <Button variant="outline" className="w-full" onClick={handleReset}>
            Reset
          </Button>
        )}
      </div>
    </main>
  )
}
