import { renderHook, act } from '@testing-library/react'
import { useMathGame } from '../hooks/useMathGame'

describe('useMathGame', () => {
  test('should initialize with correct state', () => {
    // given
    const questionCount = 10
    const maxRange = 100
    
    // when
    const { result } = renderHook(() => useMathGame(questionCount, maxRange))
    
    // then
    expect(result.current.questions.length).toBe(questionCount)
    expect(result.current.currentIndex).toBe(0)
    expect(result.current.score).toBe(0)
    expect(result.current.isGameOver).toBe(false)
  })
  
  test('should increment score when correct answer is selected', () => {
    // given
    const { result } = renderHook(() => useMathGame(10, 100))
    const correctAnswer = result.current.questions[0].correctAnswer
    
    // when
    act(() => {
      result.current.handleAnswerSelect(correctAnswer)
    })
    
    // then
    expect(result.current.score).toBe(1)
    expect(result.current.currentIndex).toBe(1)
  })
  
  test('should not increment score when incorrect answer is selected', () => {
    // given
    const { result } = renderHook(() => useMathGame(10, 100))
    const correctAnswer = result.current.questions[0].correctAnswer
    const incorrectAnswer = correctAnswer + 1
    
    // when
    act(() => {
      result.current.handleAnswerSelect(incorrectAnswer)
    })
    
    // then
    expect(result.current.score).toBe(0)
    expect(result.current.currentIndex).toBe(1)
  })
  
  test('should set isGameOver to true when all questions are answered', () => {
    // given
    const { result } = renderHook(() => useMathGame(2, 100))
    
    // when
    act(() => {
      // Answer first question
      result.current.handleAnswerSelect(result.current.questions[0].correctAnswer)
    })
    
    // Answer second question in a separate act call to ensure state updates
    act(() => {
      result.current.handleAnswerSelect(result.current.questions[1].correctAnswer)
    })
    
    // then
    expect(result.current.isGameOver).toBe(true)
    expect(result.current.score).toBe(2)
  })
  
  test('should reset game state when restartGame is called', () => {
    // given
    const { result } = renderHook(() => useMathGame(2, 100))
    
    // when
    act(() => {
      result.current.handleAnswerSelect(result.current.questions[0].correctAnswer)
      result.current.handleAnswerSelect(result.current.questions[1].correctAnswer)
      result.current.restartGame()
    })
    
    // then
    expect(result.current.currentIndex).toBe(0)
    expect(result.current.score).toBe(0)
    expect(result.current.isGameOver).toBe(false)
  })
}) 