import { describe, test, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from '../components/App'

// Mock the GamePage component
vi.mock('../pages/GamePage', () => ({
  default: () => <div data-testid="game-page">Game Page</div>
}))

// Mock the MathGameProvider
vi.mock('../hooks/MathGameProvider', () => ({
  MathGameProvider: ({ children }: { children: React.ReactNode }) => <div data-testid="math-game-provider">{children}</div>
}))

describe('App', () => {
  test('renders the GamePage inside MathGameProvider', () => {
    // given/when
    render(<App />)
    
    // then
    expect(screen.getByTestId('game-container')).toBeInTheDocument()
    expect(screen.getByTestId('math-game-provider')).toBeInTheDocument()
    expect(screen.getByTestId('game-page')).toBeInTheDocument()
  })
}) 