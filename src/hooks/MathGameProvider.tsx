import { createContext, useContext, useState, ReactNode } from 'react'
import { Question, AnswerRecord } from '../types/Question'
import { generateQuestions } from '../utils/mathQuestionGenerator'

const QUESTION_COUNT = 10

interface MathGameContextType {
  questions: Question[]
  currentIndex: number
  score: number
  isGameOver: boolean
  answers: AnswerRecord[]
  handleAnswerSelect: (selectedOption: number) => void
  restartGame: () => void
}

const MathGameContext = createContext<MathGameContextType | undefined>(undefined)

interface MathGameProviderProps {
  children: ReactNode
}

export function MathGameProvider({ children }: MathGameProviderProps) {
  const [questions, setQuestions] = useState<Question[]>(() => generateQuestions(QUESTION_COUNT))
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [isGameOver, setIsGameOver] = useState(false)
  const [answers, setAnswers] = useState<AnswerRecord[]>([])

  function handleAnswerSelect(selectedOption: number) {
    const currentQuestion = questions[currentIndex]
    const correctOption = questions[currentIndex].options[currentQuestion.correctIndex]
    const isCorrect = selectedOption === correctOption

    // Record the answer
    setAnswers(prev => [
      ...prev,
      {
        questionText: currentQuestion.text,
        selected: selectedOption,
        correct: correctOption,
        isCorrect
      }
    ])

    // Update score if correct
    if (isCorrect) {
      setScore(prev => prev + 1)
    }

    // Move to next question or end game
    const nextIndex = currentIndex + 1
    if (nextIndex < questions.length) {
      setCurrentIndex(nextIndex)
    } else {
      setIsGameOver(true)
    }
  }

  function restartGame() {
    setQuestions(generateQuestions(QUESTION_COUNT))
    setCurrentIndex(0)
    setScore(0)
    setIsGameOver(false)
    setAnswers([])
  }

  const value = {
    questions,
    currentIndex,
    score,
    isGameOver,
    answers,
    handleAnswerSelect,
    restartGame
  }

  return (
    <MathGameContext.Provider value={value}>
      {children}
    </MathGameContext.Provider>
  )
}

export function useMathGame() {
  const context = useContext(MathGameContext)
  if (!context) {
    throw new Error('useMathGame must be used within a MathGameProvider')
  }
  return context
} 