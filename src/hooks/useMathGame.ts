import { useState } from 'react'
import { Question } from '../types/Question'

export function useMathGame(questionCount: number, maxRange: number) {
  const [questions, setQuestions] = useState<Question[]>(() => generateQuestions(questionCount, maxRange))
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [isGameOver, setIsGameOver] = useState(false)

  function handleAnswerSelect(selected: number) {
    if (selected === questions[currentIndex].correctAnswer) {
      setScore(prev => prev + 1)
    }
    const nextIndex = currentIndex + 1
    if (nextIndex < questionCount) {
      setCurrentIndex(nextIndex)
    } else {
      setIsGameOver(true)
    }
  }

  function restartGame() {
    setQuestions(generateQuestions(questionCount, maxRange))
    setCurrentIndex(0)
    setScore(0)
    setIsGameOver(false)
  }

  return {
    questions,
    currentIndex,
    score,
    isGameOver,
    handleAnswerSelect,
    restartGame
  }
}

function randomNumber(max: number) {
  return Math.floor(Math.random() * (max + 1))
}

function generateQuestion(max: number): Question {
  const num1 = randomNumber(max)
  const num2 = randomNumber(max)
  const correctAnswer = num1 + num2

  const distractors: Set<number> = new Set()
  while (distractors.size < 3) {
    const candidate = randomNumber(max * 2)
    if (candidate !== correctAnswer) {
      distractors.add(candidate)
    }
  }

  const options = [...distractors, correctAnswer].sort(() => Math.random() - 0.5)

  return { num1, num2, correctAnswer, options }
}

function generateQuestions(count: number, max: number): Question[] {
  const questions: Question[] = []
  for (let i = 0; i < count; i++) {
    questions.push(generateQuestion(max))
  }
  return questions
} 