import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { RideEligibilityQueries } from '../../application/queries/RideEligibilityQueries'
import type { CheckRideEligibilityCommand } from '../../application/use-cases/CheckRideEligibility'
import { checkEligibility } from '../../domain/services/RideEligibilityService'
import { bikes } from '../../infrastructure/data/bikes'
import { stations } from '../../infrastructure/data/stations'
import { users } from '../../infrastructure/data/users'
import {
  type RideEligibilityModule,
  RideEligibilityProvider,
} from '../context/RideEligibilityContext'
import { RideEligibilityPage } from './RideEligibilityPage'

function createTestModule(): RideEligibilityModule {
  const queries: RideEligibilityQueries = {
    getUsers: async () => users,
    getBikes: async () => bikes,
    getStations: async () => stations,
  }

  return {
    queries,
    checkRideEligibility: {
      async execute(command: CheckRideEligibilityCommand) {
        const user = users.find((u) => u.id === command.userId)
        if (!user)
          return {
            outcome: 'entity_not_found' as const,
            entity: 'User' as const,
            id: command.userId,
          }
        const bike = bikes.find((b) => b.id === command.bikeId)
        if (!bike)
          return {
            outcome: 'entity_not_found' as const,
            entity: 'Bike' as const,
            id: command.bikeId,
          }
        const station = stations.find((s) => s.id === command.stationId)
        if (!station)
          return {
            outcome: 'entity_not_found' as const,
            entity: 'Station' as const,
            id: command.stationId,
          }
        return { outcome: 'decided' as const, result: checkEligibility(user, bike, station) }
      },
    },
  }
}

function renderPage() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
  const module = createTestModule()

  return render(
    <QueryClientProvider client={queryClient}>
      <RideEligibilityProvider module={module}>
        <RideEligibilityPage />
      </RideEligibilityProvider>
    </QueryClientProvider>,
  )
}

async function selectOption(
  user: ReturnType<typeof userEvent.setup>,
  triggerId: string,
  optionText: string,
) {
  const trigger = document.getElementById(triggerId) as HTMLElement
  await user.click(trigger)
  const option = await screen.findByText(optionText, {}, { timeout: 3000 })
  await user.click(option)
}

describe('RideEligibilityPage', () => {
  it('shows loading state then renders the form', async () => {
    renderPage()

    expect(screen.getByText('Loading...')).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByText('Ride Eligibility Check')).toBeInTheDocument()
    })

    expect(screen.getByRole('button', { name: 'Check Eligibility' })).toBeDisabled()
  })

  it('enables submit button when all selections are made', async () => {
    const user = userEvent.setup()
    renderPage()

    await screen.findByText('Ride Eligibility Check')

    await selectOption(user, 'user-select', 'Bruno Costa (Premium — Active)')
    await selectOption(user, 'bike-select', 'Volt Pro (Electric — Available)')
    await selectOption(user, 'station-select', 'Praça da Liberdade (Allowed)')

    expect(screen.getByRole('button', { name: 'Check Eligibility' })).toBeEnabled()
  })

  it('displays allowed result for eligible combination', async () => {
    const user = userEvent.setup()
    renderPage()

    await screen.findByText('Ride Eligibility Check')

    await selectOption(user, 'user-select', 'Bruno Costa (Premium — Active)')
    await selectOption(user, 'bike-select', 'Volt Pro (Electric — Available)')
    await selectOption(user, 'station-select', 'Praça da Liberdade (Allowed)')
    await user.click(screen.getByRole('button', { name: 'Check Eligibility' }))

    await waitFor(() => {
      expect(screen.getByText('Ride Allowed')).toBeInTheDocument()
    })
  })

  it('displays block reasons for ineligible combination', async () => {
    const user = userEvent.setup()
    renderPage()

    await screen.findByText('Ride Eligibility Check')

    await selectOption(user, 'user-select', 'Carla Mendes (Basic — Inactive)')
    await selectOption(user, 'bike-select', 'City Cruiser (Standard — Available)')
    await selectOption(user, 'station-select', 'Praça da Liberdade (Allowed)')
    await user.click(screen.getByRole('button', { name: 'Check Eligibility' }))

    await waitFor(() => {
      expect(screen.getByText('Ride Blocked')).toBeInTheDocument()
    })
    expect(screen.getByText('Account is inactive')).toBeInTheDocument()
  })

  it('resets form and result when reset is clicked', async () => {
    const user = userEvent.setup()
    renderPage()

    await screen.findByText('Ride Eligibility Check')

    await selectOption(user, 'user-select', 'Bruno Costa (Premium — Active)')
    await selectOption(user, 'bike-select', 'Volt Pro (Electric — Available)')
    await selectOption(user, 'station-select', 'Praça da Liberdade (Allowed)')
    await user.click(screen.getByRole('button', { name: 'Check Eligibility' }))

    await waitFor(() => {
      expect(screen.getByText('Ride Allowed')).toBeInTheDocument()
    })

    await user.click(screen.getByRole('button', { name: 'Reset' }))

    expect(screen.queryByText('Ride Allowed')).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Check Eligibility' })).toBeDisabled()
  })
})
