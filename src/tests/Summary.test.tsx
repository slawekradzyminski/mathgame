import { render, screen, fireEvent } from '@testing-library/react'
import Summary from '../components/Summary'

describe('Summary', () => {
  it('should display the score and play again button', () => {
    // given
    render(<Summary score={7} questionCount={10} onPlayAgain={() => {}} />)
    
    // then
    expect(screen.getByText('Game Over!')).toBeInTheDocument()
    
    // Use a more flexible approach for text split across elements
    expect(screen.getByText(/Your score:/)).toBeInTheDocument()
    expect(screen.getByText('7', { selector: 'strong' })).toBeInTheDocument()
    expect(screen.getByText(/\//, { exact: false })).toBeInTheDocument()
    expect(screen.getByText(/10/, { exact: false })).toBeInTheDocument()
    
    expect(screen.getByRole('button', { name: 'Play Again' })).toBeInTheDocument()
  })
  
  it('should call onPlayAgain when the play again button is clicked', () => {
    // given
    const onPlayAgain = vi.fn()
    render(<Summary score={7} questionCount={10} onPlayAgain={onPlayAgain} />)
    
    // when
    fireEvent.click(screen.getByRole('button', { name: 'Play Again' }))
    
    // then
    expect(onPlayAgain).toHaveBeenCalled()
  })
}) 