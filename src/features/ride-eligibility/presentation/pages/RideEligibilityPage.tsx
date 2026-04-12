import { useCheckRideEligibility } from '@/ride-elegibility/presentation/commands/useCheckRideEligibility'
import { EligibilityForm } from '@/ride-elegibility/presentation/components/EligibilityForm'
import { EligibilityResultCard } from '@/ride-elegibility/presentation/components/EligibilityResultCard'
import { useRideEligibilityModule } from '@/ride-elegibility/presentation/context/RideEligibilityContext'
import { useRideEligibilityForm } from '@/ride-elegibility/presentation/form/useRideEligibilityForm'
import { Alert, AlertDescription, AlertTitle } from '@/shared/ui/alert'
import { Button } from '@/shared/ui/button'
import { useRideEligibilityOptionsQuery } from '../queries/useRideEligibilityOptionsQuery'

export function RideEligibilityPage() {
  const { checkRideEligibility } = useRideEligibilityModule()
  const options = useRideEligibilityOptionsQuery()
  const form = useRideEligibilityForm({
    users: options.users,
    bikes: options.bikes,
    stations: options.stations,
  })
  const checkRideEligibilityCommand = useCheckRideEligibility({ checkRideEligibility })

  function handleUserChange(id: string | null) {
    checkRideEligibilityCommand.resetEvaluation()
    form.setUserId(id ?? '')
  }

  function handleBikeChange(id: string | null) {
    checkRideEligibilityCommand.resetEvaluation()
    form.setBikeId(id ?? '')
  }

  function handleStationChange(id: string | null) {
    checkRideEligibilityCommand.resetEvaluation()
    form.setStationId(id ?? '')
  }

  async function handleCheckEligibility() {
    await checkRideEligibilityCommand.checkEligibilityForSelection({
      user: form.user,
      bike: form.bike,
      station: form.station,
    })
  }

  function handleReset() {
    form.resetSelection()
    checkRideEligibilityCommand.resetEvaluation()
  }

  if (options.isLoading) {
    return (
      <main className="min-h-screen bg-background px-4 py-10">
        <div className="mx-auto w-full max-w-md">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </main>
    )
  }

  if (options.isError) {
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
          selectedUserId={form.user?.id ?? ''}
          selectedBikeId={form.bike?.id ?? ''}
          selectedStationId={form.station?.id ?? ''}
          onUserChange={handleUserChange}
          onBikeChange={handleBikeChange}
          onStationChange={handleStationChange}
          onCheckEligibility={handleCheckEligibility}
          canCheckEligibility={form.canCheckEligibility}
        />

        {checkRideEligibilityCommand.viewModel.status === 'system_error' && (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{checkRideEligibilityCommand.viewModel.message}</AlertDescription>
          </Alert>
        )}

        {(checkRideEligibilityCommand.viewModel.status === 'eligible' ||
          checkRideEligibilityCommand.viewModel.status === 'ineligible') && (
          <EligibilityResultCard viewModel={checkRideEligibilityCommand.viewModel} />
        )}

        {checkRideEligibilityCommand.hasResult && (
          <Button variant="outline" className="w-full" onClick={handleReset}>
            Reset
          </Button>
        )}
      </div>
    </main>
  )
}
