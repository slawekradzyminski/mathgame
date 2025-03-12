import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import QuestionCard from '../components/QuestionCard/QuestionCard'

// Mock the useMathGame hook
vi.mock('../hooks/MathGameProvider', () => ({
  useMathGame: vi.fn()
}))

// Import the mocked hook
import { useMathGame } from '../hooks/MathGameProvider'

const useMathGameMock = useMathGame as unknown as ReturnType<typeof vi.fn>

describe('QuestionCard', () => {
  const mockQuestion = {
    text: '5 + 3 = ?',
    options: [7, 8, 9, 10],
    correctIndex: 1
  }

  beforeEach(() => {
    // Default mock implementation
    useMathGameMock.mockReturnValue({
      questions: [mockQuestion],
      currentIndex: 0,
      handleAnswerSelect: vi.fn()
    })
    
    // Mock timers
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.clearAllMocks()
    vi.useRealTimers()
  })

  test('renders the question and answer options', () => {
    // given/when
    render(<QuestionCard />)
    
    // then
    expect(screen.getByText('5 + 3 = ?')).toBeInTheDocument()
    expect(screen.getByText('7')).toBeInTheDocument()
    expect(screen.getByText('8')).toBeInTheDocument()
    expect(screen.getByText('9')).toBeInTheDocument()
    expect(screen.getByText('10')).toBeInTheDocument()
  })

  test('highlights correct answer when selected', () => {
    // given
    render(<QuestionCard />)
    
    // when
    fireEvent.click(screen.getByText('8'))
    
    // then
    expect(screen.getByTestId('answer-1')).toHaveClass('correct')
  })

  test('highlights wrong answer when selected and shows correct answer', () => {
    // given
    render(<QuestionCard />)
    
    // when
    fireEvent.click(screen.getByText('7'))
    
    // then
    expect(screen.getByTestId('answer-0')).toHaveClass('wrong')
    expect(screen.getByTestId('answer-1')).toHaveClass('correct')
  })

  test('disables all buttons after selection', () => {
    // given
    render(<QuestionCard />)
    
    // when
    fireEvent.click(screen.getByText('7'))
    
    // then
    const buttons = screen.getAllByRole('button')
    buttons.forEach(button => {
      expect(button).toBeDisabled()
    })
  })

  test('calls handleAnswerSelect after delay', () => {
    // given
    const handleAnswerSelect = vi.fn()
    useMathGameMock.mockReturnValue({
      questions: [mockQuestion],
      currentIndex: 0,
      handleAnswerSelect
    })
    
    // when
    render(<QuestionCard />)
    fireEvent.click(screen.getByText('8'))
    
    // Advance timers
    act(() => {
      vi.advanceTimersByTime(2000) // Advance by 2000ms (2 seconds)
    })
    
    // then
    expect(handleAnswerSelect).toHaveBeenCalledWith(8)
  })
}) 