import { describe, test, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MathGameProvider, useMathGame } from '../hooks/MathGameProvider'
import { generateQuestions } from '../utils/mathQuestionGenerator'

// Mock the generateQuestions function
vi.mock('../utils/mathQuestionGenerator', () => ({
  generateQuestions: vi.fn(() => [
    {
      text: '5 + 3 = ?',
      options: [7, 8, 9, 10],
      correctIndex: 1 // 8 is correct
    },
    {
      text: '4 * 2 = ?',
      options: [6, 7, 8, 9],
      correctIndex: 2 // 8 is correct
    }
  ])
}))

// Test component that uses the hook
function TestComponent() {
  const { 
    questions, 
    currentIndex, 
    score, 
    isGameOver, 
    answers, 
    handleAnswerSelect, 
    restartGame 
  } = useMathGame()

  return (
    <div>
      <div data-testid="current-index">{currentIndex}</div>
      <div data-testid="score">{score}</div>
      <div data-testid="is-game-over">{isGameOver ? 'true' : 'false'}</div>
      <div data-testid="answers-count">{answers.length}</div>
      
      {!isGameOver && questions[currentIndex] && (
        <div>
          <div data-testid="question-text">{questions[currentIndex].text}</div>
          <div>
            {questions[currentIndex].options.map((option, idx) => (
              <button 
                key={idx} 
                data-testid={`option-${idx}`}
                onClick={() => handleAnswerSelect(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {isGameOver && (
        <button data-testid="restart" onClick={restartGame}>
          Restart
        </button>
      )}
    </div>
  )
}

describe('MathGameProvider', () => {
  test('should initialize with correct state', () => {
    // given/when
    render(
      <MathGameProvider>
        <TestComponent />
      </MathGameProvider>
    )
    
    // then
    expect(screen.getByTestId('current-index').textContent).toBe('0')
    expect(screen.getByTestId('score').textContent).toBe('0')
    expect(screen.getByTestId('is-game-over').textContent).toBe('false')
    expect(screen.getByTestId('answers-count').textContent).toBe('0')
    expect(screen.getByTestId('question-text').textContent).toBe('5 + 3 = ?')
  })
  
  test('should update score when correct answer is selected', () => {
    // given
    render(
      <MathGameProvider>
        <TestComponent />
      </MathGameProvider>
    )
    
    // when - select the correct answer (8)
    fireEvent.click(screen.getByTestId('option-1'))
    
    // then
    expect(screen.getByTestId('score').textContent).toBe('1')
    expect(screen.getByTestId('current-index').textContent).toBe('1')
    expect(screen.getByTestId('answers-count').textContent).toBe('1')
  })
  
  test('should not update score when incorrect answer is selected', () => {
    // given
    render(
      <MathGameProvider>
        <TestComponent />
      </MathGameProvider>
    )
    
    // when - select an incorrect answer (7)
    fireEvent.click(screen.getByTestId('option-0'))
    
    // then
    expect(screen.getByTestId('score').textContent).toBe('0')
    expect(screen.getByTestId('current-index').textContent).toBe('1')
    expect(screen.getByTestId('answers-count').textContent).toBe('1')
  })

  test('should set game over when all questions are answered', () => {
    // given
    render(
      <MathGameProvider>
        <TestComponent />
      </MathGameProvider>
    )
    
    // when - answer both questions
    fireEvent.click(screen.getByTestId('option-1')) // first question
    fireEvent.click(screen.getByTestId('option-2')) // second question
    
    // then
    expect(screen.getByTestId('is-game-over').textContent).toBe('true')
    expect(screen.getByTestId('score').textContent).toBe('2')
    expect(screen.getByTestId('answers-count').textContent).toBe('2')
    expect(screen.getByTestId('restart')).toBeInTheDocument()
  })
  
  test('should restart the game when restart button is clicked', () => {
    // given
    render(
      <MathGameProvider>
        <TestComponent />
      </MathGameProvider>
    )
    
    // Answer both questions to end the game
    fireEvent.click(screen.getByTestId('option-1')) // first question
    fireEvent.click(screen.getByTestId('option-2')) // second question
    
    // when - restart the game
    fireEvent.click(screen.getByTestId('restart'))
    
    // then
    expect(screen.getByTestId('current-index').textContent).toBe('0')
    expect(screen.getByTestId('score').textContent).toBe('0')
    expect(screen.getByTestId('is-game-over').textContent).toBe('false')
    expect(screen.getByTestId('answers-count').textContent).toBe('0')
    expect(screen.getByTestId('question-text').textContent).toBe('5 + 3 = ?')
  })
}) 