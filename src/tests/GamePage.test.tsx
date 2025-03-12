import { render, screen } from '@testing-library/react'
import GamePage from '../pages/GamePage'

describe('GamePage', () => {
  test('should display Question 1 of 10', () => {
    // given
    render(<GamePage />)
    
    // when
    const questionText = screen.getByText(/Question 1 of 10/i)
    
    // then
    expect(questionText).toBeInTheDocument()
  })
}) 