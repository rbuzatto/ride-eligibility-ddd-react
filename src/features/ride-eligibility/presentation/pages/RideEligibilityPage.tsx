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
    result,
    error,
    handleCheck,
    handleReset,
  } = useRideEligibility()

  return (
    <main>
      <h1>Ride Eligibility Check</h1>

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

      {error && <p role="alert">{error}</p>}

      {result && <EligibilityResultCard result={result} />}

      {(result || error) && (
        <button type="button" onClick={handleReset}>
          Reset
        </button>
      )}
    </main>
  )
}
