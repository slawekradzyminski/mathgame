import { describe, test, expect, vi, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import GamePage from '../pages/GamePage'

// Mock the components
vi.mock('../components/QuestionCard/QuestionCard', () => ({
  default: () => <div data-testid="question-card">Question Card</div>
}))

vi.mock('../components/Summary/Summary', () => ({
  default: () => <div data-testid="summary">Summary</div>
}))

// Mock the useMathGame hook
vi.mock('../hooks/MathGameProvider', () => ({
  useMathGame: vi.fn()
}))

// Import the mocked hook
import { useMathGame } from '../hooks/MathGameProvider'

const useMathGameMock = useMathGame as unknown as ReturnType<typeof vi.fn>

describe('GamePage', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  test('renders QuestionCard when game is not over', () => {
    // given
    useMathGameMock.mockReturnValue({
      isGameOver: false,
      currentIndex: 0,
      score: 0,
      questions: [
        {
          text: '5 + 3 = ?',
          options: [7, 8, 9, 10],
          correctIndex: 1
        }
      ]
    })
    
    // when
    render(<GamePage />)
    
    // then
    expect(screen.getByTestId('question-card')).toBeInTheDocument()
    expect(screen.queryByTestId('summary')).not.toBeInTheDocument()
    expect(screen.getByText('Math Game')).toBeInTheDocument()
    expect(screen.getByText('Question 1 of 10')).toBeInTheDocument()
    expect(screen.getByText('Score: 0')).toBeInTheDocument()
  })

  test('renders Summary when game is over', () => {
    // given
    useMathGameMock.mockReturnValue({
      isGameOver: true,
      currentIndex: 0,
      score: 3,
      questions: [
        {
          text: '5 + 3 = ?',
          options: [7, 8, 9, 10],
          correctIndex: 1
        }
      ],
      answers: [
        { questionText: '5 + 3 = ?', selected: 8, correct: 8, isCorrect: true },
        { questionText: '10 - 4 = ?', selected: 6, correct: 6, isCorrect: true },
        { questionText: '7 * 2 = ?', selected: 12, correct: 14, isCorrect: false }
      ]
    })
    
    // when
    render(<GamePage />)
    
    // then
    expect(screen.getByTestId('summary')).toBeInTheDocument()
    expect(screen.queryByTestId('question-card')).not.toBeInTheDocument()
  })
}) 