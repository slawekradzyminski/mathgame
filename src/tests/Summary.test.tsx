import { render, screen, fireEvent } from '@testing-library/react'
import Summary from '../components/Summary'

describe('Summary', () => {
  test('should display the score and play again button', () => {
    // given
    const score = 7
    const questionCount = 10
    const onPlayAgain = vi.fn()
    
    // when
    render(<Summary score={score} questionCount={questionCount} onPlayAgain={onPlayAgain} />)
    
    // then
    expect(screen.getByText('Game Over!')).toBeInTheDocument()
    expect(screen.getByText('Your score: 7 / 10')).toBeInTheDocument()
    expect(screen.getByText('Play Again')).toBeInTheDocument()
  })
  
  test('should call onPlayAgain when the play again button is clicked', () => {
    // given
    const score = 7
    const questionCount = 10
    const onPlayAgain = vi.fn()
    
    // when
    render(<Summary score={score} questionCount={questionCount} onPlayAgain={onPlayAgain} />)
    fireEvent.click(screen.getByText('Play Again'))
    
    // then
    expect(onPlayAgain).toHaveBeenCalled()
  })
}) 