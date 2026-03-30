import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RideEligibilityPage } from './RideEligibilityPage'

describe('RideEligibilityPage', () => {
  it('renders the heading and form elements', () => {
    render(<RideEligibilityPage />)

    expect(screen.getByText('Ride Eligibility Check')).toBeInTheDocument()
    expect(screen.getByLabelText('User')).toBeInTheDocument()
    expect(screen.getByLabelText('Bike')).toBeInTheDocument()
    expect(screen.getByLabelText('Station')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Check Eligibility' })).toBeDisabled()
  })

  it('enables submit button when all selections are made', async () => {
    const user = userEvent.setup()
    render(<RideEligibilityPage />)

    await user.selectOptions(screen.getByLabelText('User'), 'user-2')
    await user.selectOptions(screen.getByLabelText('Bike'), 'bike-2')
    await user.selectOptions(screen.getByLabelText('Station'), 'station-1')

    expect(screen.getByRole('button', { name: 'Check Eligibility' })).toBeEnabled()
  })

  it('displays allowed result for eligible combination', async () => {
    const user = userEvent.setup()
    render(<RideEligibilityPage />)

    await user.selectOptions(screen.getByLabelText('User'), 'user-2')
    await user.selectOptions(screen.getByLabelText('Bike'), 'bike-2')
    await user.selectOptions(screen.getByLabelText('Station'), 'station-1')
    await user.click(screen.getByRole('button', { name: 'Check Eligibility' }))

    expect(screen.getByText('Ride Allowed')).toBeInTheDocument()
  })

  it('displays block reasons for ineligible combination', async () => {
    const user = userEvent.setup()
    render(<RideEligibilityPage />)

    // user-3 is inactive
    await user.selectOptions(screen.getByLabelText('User'), 'user-3')
    await user.selectOptions(screen.getByLabelText('Bike'), 'bike-1')
    await user.selectOptions(screen.getByLabelText('Station'), 'station-1')
    await user.click(screen.getByRole('button', { name: 'Check Eligibility' }))

    expect(screen.getByText('Ride Blocked')).toBeInTheDocument()
    expect(screen.getByText('Account is inactive')).toBeInTheDocument()
  })

  it('displays multiple block reasons', async () => {
    const user = userEvent.setup()
    render(<RideEligibilityPage />)

    // user-3 is inactive, bike-3 is unavailable, station-2 pickup not allowed
    await user.selectOptions(screen.getByLabelText('User'), 'user-3')
    await user.selectOptions(screen.getByLabelText('Bike'), 'bike-3')
    await user.selectOptions(screen.getByLabelText('Station'), 'station-2')
    await user.click(screen.getByRole('button', { name: 'Check Eligibility' }))

    expect(screen.getByText('Ride Blocked')).toBeInTheDocument()
    expect(screen.getByText('Account is inactive')).toBeInTheDocument()
    expect(screen.getByText('Bike is not available')).toBeInTheDocument()
    expect(screen.getByText('Pickup is not allowed at this station')).toBeInTheDocument()
  })

  it('resets form and result when reset is clicked', async () => {
    const user = userEvent.setup()
    render(<RideEligibilityPage />)

    await user.selectOptions(screen.getByLabelText('User'), 'user-2')
    await user.selectOptions(screen.getByLabelText('Bike'), 'bike-2')
    await user.selectOptions(screen.getByLabelText('Station'), 'station-1')
    await user.click(screen.getByRole('button', { name: 'Check Eligibility' }))

    expect(screen.getByText('Ride Allowed')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Reset' }))

    expect(screen.queryByText('Ride Allowed')).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Check Eligibility' })).toBeDisabled()
  })
})
