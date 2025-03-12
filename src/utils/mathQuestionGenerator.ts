import { Question } from '../types/Question'

/**
 * Generates a random number between min and max (inclusive)
 */
function randomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * Generates a single math question with random operands and operator
 */
export function generateQuestion(): Question {
  const operators = ['+', '-', '*']
  const op = operators[Math.floor(Math.random() * operators.length)]

  const a = randomNumber(1, 10)
  const b = randomNumber(1, 10)

  let correctAnswer: number
  let text: string

  switch (op) {
    case '+':
      correctAnswer = a + b
      text = `${a} + ${b} = ?`
      break
    case '-':
      correctAnswer = a - b
      text = `${a} - ${b} = ?`
      break
    case '*':
      correctAnswer = a * b
      text = `${a} × ${b} = ?`
      break
    default:
      correctAnswer = a + b
      text = `${a} + ${b} = ?`
  }

  // Generate 3 unique distractors
  const distractors: Set<number> = new Set()
  
  while (distractors.size < 3) {
    // Generate a distractor within a reasonable range of the correct answer
    const min = Math.max(1, correctAnswer - 10)
    const max = correctAnswer + 10
    const distractor = randomNumber(min, max)
    
    // Only add if it's not the correct answer
    if (distractor !== correctAnswer) {
      distractors.add(distractor)
    }
  }

  // Create options array with correct answer and distractors
  const options = [...distractors, correctAnswer]
  
  // Shuffle the options
  options.sort(() => Math.random() - 0.5)
  
  // Find the index of the correct answer in the shuffled options
  const correctIndex = options.indexOf(correctAnswer)

  return { text, options, correctIndex }
}

/**
 * Generates an array of math questions
 */
export function generateQuestions(count: number): Question[] {
  const questions: Question[] = []
  for (let i = 0; i < count; i++) {
    questions.push(generateQuestion())
  }
  return questions
} 