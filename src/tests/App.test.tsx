import { render, screen } from '@testing-library/react'
import App from '../components/App'

describe('App', () => {
  test('renders Math Game heading', () => {
    // given
    render(<App />)
    
    // when
    const heading = screen.getByText(/Math Game/i)
    
    // then
    expect(heading).toBeInTheDocument()
  })
}) 