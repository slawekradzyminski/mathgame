import { describe, test, expect, vi, afterEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Summary from '../components/Summary/Summary'

// Mock the useMathGame hook
vi.mock('../hooks/MathGameProvider', () => ({
  useMathGame: vi.fn()
}))

// Import the mocked hook
import { useMathGame } from '../hooks/MathGameProvider'

const useMathGameMock = useMathGame as unknown as ReturnType<typeof vi.fn>

describe('Summary', () => {
  const mockAnswers = [
    { questionText: '5 + 3 = ?', selected: 8, correct: 8, isCorrect: true },
    { questionText: '10 - 4 = ?', selected: 6, correct: 6, isCorrect: true },
    { questionText: '7 * 2 = ?', selected: 12, correct: 14, isCorrect: false },
    { questionText: '20 / 4 = ?', selected: 5, correct: 5, isCorrect: true }
  ]

  afterEach(() => {
    vi.clearAllMocks()
  })

  test('displays the correct score and percentage', () => {
    // given
    useMathGameMock.mockReturnValue({
      score: 3,
      answers: mockAnswers,
      restartGame: vi.fn()
    })
    
    // when
    render(<Summary />)
    
    // then
    expect(screen.getByText(/Your Score:/)).toHaveTextContent('Your Score: 3 / 4 (75%)')
  })

  test('displays the correct message based on score percentage', () => {
    // given
    useMathGameMock.mockReturnValue({
      score: 3,
      answers: mockAnswers,
      restartGame: vi.fn()
    })
    
    // when
    render(<Summary />)
    
    // then
    expect(screen.getByText('Good job!')).toBeInTheDocument()
    
    // Test with a different score
    useMathGameMock.mockReturnValue({
      score: 1,
      answers: mockAnswers,
      restartGame: vi.fn()
    })
    
    render(<Summary />)
    expect(screen.getByText('Try again!')).toBeInTheDocument()
  })

  test('displays all answers with correct styling', () => {
    // given
    useMathGameMock.mockReturnValue({
      score: 3,
      answers: mockAnswers,
      restartGame: vi.fn()
    })
    
    // when
    render(<Summary />)
    
    // then
    const answerItems = screen.getAllByTestId(/answer-item-/)
    expect(answerItems).toHaveLength(4)
    
    // Check first answer (correct)
    expect(answerItems[0]).toHaveClass('correct')
    expect(answerItems[0]).toHaveTextContent('5 + 3 = ?')
    expect(answerItems[0]).toHaveTextContent('Your answer: 8')
    
    // Check third answer (wrong)
    expect(answerItems[2]).toHaveClass('wrong')
    expect(answerItems[2]).toHaveTextContent('7 * 2 = ?')
    expect(answerItems[2]).toHaveTextContent('Your answer: 12')
    expect(answerItems[2]).toHaveTextContent('Correct answer: 14')
  })

  test('calls restartGame when Play Again button is clicked', () => {
    // given
    const restartGame = vi.fn()
    useMathGameMock.mockReturnValue({
      score: 3,
      answers: mockAnswers,
      restartGame
    })
    
    // when
    render(<Summary />)
    fireEvent.click(screen.getByTestId('play-again-button'))
    
    // then
    expect(restartGame).toHaveBeenCalled()
  })
}) 