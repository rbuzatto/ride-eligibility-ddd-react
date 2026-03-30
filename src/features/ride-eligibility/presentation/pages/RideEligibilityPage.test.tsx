import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { rideEligibilityModule } from '../../index'
import { RideEligibilityProvider } from '../context/RideEligibilityContext'
import { RideEligibilityPage } from './RideEligibilityPage'

function renderPage() {
  return render(
    <RideEligibilityProvider module={rideEligibilityModule}>
      <RideEligibilityPage />
    </RideEligibilityProvider>,
  )
}

async function selectOption(
  user: ReturnType<typeof userEvent.setup>,
  triggerId: string,
  optionText: string,
) {
  const trigger = document.getElementById(triggerId) as HTMLElement
  await user.click(trigger)
  const option = await screen.findByText(optionText, {}, { timeout: 2000 })
  await user.click(option)
}

describe('RideEligibilityPage', () => {
  it('renders the heading and form elements', () => {
    renderPage()

    expect(screen.getByText('Ride Eligibility Check')).toBeInTheDocument()
    expect(screen.getByText('User')).toBeInTheDocument()
    expect(screen.getByText('Bike')).toBeInTheDocument()
    expect(screen.getByText('Station')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Check Eligibility' })).toBeDisabled()
  })

  it('enables submit button when all selections are made', async () => {
    const user = userEvent.setup()
    renderPage()

    await selectOption(user, 'user-select', 'Bruno Costa (Premium — Active)')
    await selectOption(user, 'bike-select', 'Volt Pro (Electric — Available)')
    await selectOption(user, 'station-select', 'Praça da Liberdade (Allowed)')

    expect(screen.getByRole('button', { name: 'Check Eligibility' })).toBeEnabled()
  })

  it('displays allowed result for eligible combination', async () => {
    const user = userEvent.setup()
    renderPage()

    await selectOption(user, 'user-select', 'Bruno Costa (Premium — Active)')
    await selectOption(user, 'bike-select', 'Volt Pro (Electric — Available)')
    await selectOption(user, 'station-select', 'Praça da Liberdade (Allowed)')
    await user.click(screen.getByRole('button', { name: 'Check Eligibility' }))

    expect(screen.getByText('Ride Allowed')).toBeInTheDocument()
  })

  it('displays block reasons for ineligible combination', async () => {
    const user = userEvent.setup()
    renderPage()

    // Carla is inactive
    await selectOption(user, 'user-select', 'Carla Mendes (Basic — Inactive)')
    await selectOption(user, 'bike-select', 'City Cruiser (Standard — Available)')
    await selectOption(user, 'station-select', 'Praça da Liberdade (Allowed)')
    await user.click(screen.getByRole('button', { name: 'Check Eligibility' }))

    expect(screen.getByText('Ride Blocked')).toBeInTheDocument()
    expect(screen.getByText('Account is inactive')).toBeInTheDocument()
  })

  it('displays hard blocks and soft blocks separately', async () => {
    const user = userEvent.setup()
    renderPage()

    // Carla is inactive (hard), bike unavailable (hard), station suspended (soft)
    await selectOption(user, 'user-select', 'Carla Mendes (Basic — Inactive)')
    await selectOption(user, 'bike-select', 'Urban Glide (Standard — Unavailable)')
    await selectOption(user, 'station-select', 'Estação Central (Suspended)')
    await user.click(screen.getByRole('button', { name: 'Check Eligibility' }))

    expect(screen.getByText('Ride Blocked')).toBeInTheDocument()
    expect(screen.getByText('Account is inactive')).toBeInTheDocument()
    expect(screen.getByText('Bike is not available')).toBeInTheDocument()
    expect(screen.getByText('Pickup is not available at this station')).toBeInTheDocument()
  })

  it('resets form and result when reset is clicked', async () => {
    const user = userEvent.setup()
    renderPage()

    await selectOption(user, 'user-select', 'Bruno Costa (Premium — Active)')
    await selectOption(user, 'bike-select', 'Volt Pro (Electric — Available)')
    await selectOption(user, 'station-select', 'Praça da Liberdade (Allowed)')
    await user.click(screen.getByRole('button', { name: 'Check Eligibility' }))

    expect(screen.getByText('Ride Allowed')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Reset' }))

    expect(screen.queryByText('Ride Allowed')).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Check Eligibility' })).toBeDisabled()
  })
})
