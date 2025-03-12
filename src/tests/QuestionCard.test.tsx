import { render, screen, fireEvent } from '@testing-library/react'
import QuestionCard from '../components/QuestionCard'
import { Question } from '../types/Question'

describe('QuestionCard', () => {
  test('should display the question and answer options', () => {
    // given
    const mockQuestion: Question = {
      num1: 5,
      num2: 7,
      correctAnswer: 12,
      options: [10, 12, 14, 16]
    }
    const handleAnswerSelect = vi.fn()
    
    // when
    render(<QuestionCard question={mockQuestion} onAnswerSelect={handleAnswerSelect} />)
    
    // then
    expect(screen.getByText('5 + 7 = ?')).toBeInTheDocument()
    expect(screen.getByText('10')).toBeInTheDocument()
    expect(screen.getByText('12')).toBeInTheDocument()
    expect(screen.getByText('14')).toBeInTheDocument()
    expect(screen.getByText('16')).toBeInTheDocument()
  })
  
  test('should call onAnswerSelect when an option is clicked', () => {
    // given
    const mockQuestion: Question = {
      num1: 5,
      num2: 7,
      correctAnswer: 12,
      options: [10, 12, 14, 16]
    }
    const handleAnswerSelect = vi.fn()
    
    // when
    render(<QuestionCard question={mockQuestion} onAnswerSelect={handleAnswerSelect} />)
    fireEvent.click(screen.getByText('12'))
    
    // then
    expect(handleAnswerSelect).toHaveBeenCalledWith(12)
  })
}) 