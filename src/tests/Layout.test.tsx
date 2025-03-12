import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import App from '../components/App'

describe('Layout', () => {
  // given
  beforeEach(() => {
    // Mock window dimensions
    Object.defineProperty(window, 'innerWidth', { value: 1024, writable: true })
    Object.defineProperty(window, 'innerHeight', { value: 768, writable: true })
    
    // Mock getBoundingClientRect for container elements
    Element.prototype.getBoundingClientRect = vi.fn().mockImplementation(() => ({
      width: 1024,
      height: 768,
      top: 0,
      left: 0,
      bottom: 768,
      right: 1024,
      x: 0,
      y: 0,
      toJSON: () => {}
    }))
  })

  test('should render the game with proper centering', () => {
    // when
    render(<App />)
    
    // then
    const gameContainer = screen.getByTestId('game-container')
    expect(gameContainer).toBeInTheDocument()
    
    // Check if the container has proper centering styles
    expect(gameContainer).toHaveStyle({
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      width: '100%'
    })
    
    // Check if the content is properly sized
    const contentContainer = screen.getByTestId('content-container')
    expect(contentContainer).toBeInTheDocument()
    expect(contentContainer).toHaveStyle({
      width: '100%',
      maxWidth: '800px'
    })
  })
}) 