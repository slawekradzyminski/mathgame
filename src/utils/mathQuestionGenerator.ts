import { Question } from '../types/Question'

/**
 * Generates a random number between min and max (inclusive)
 */
function randomNumber(min: number, max: number): number {
  // Ensure min is at least 1 to avoid zero values
  min = Math.max(1, min)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * Generates a single math question with random operands and operator
 */
export function generateQuestion(): Question {
  // For a 7-year-old, we'll use simpler operations and ensure no negative results
  const operators = ['+', '-', '*']
  const op = operators[Math.floor(Math.random() * operators.length)]

  let a: number
  let b: number
  let correctAnswer: number
  let text: string

  switch (op) {
    case '+':
      // Addition: numbers from 1-100, but keep one operand smaller for easier addition
      a = randomNumber(1, 100)
      b = randomNumber(1, 100)
      correctAnswer = a + b
      text = `${a} + ${b} = ?`
      break
    case '-':
      // Subtraction: ensure a >= b so result is never negative
      a = randomNumber(10, 100)
      b = randomNumber(1, Math.min(100, a - 1))
      correctAnswer = a - b
      // Ensure correctAnswer is at least 1
      if (correctAnswer < 1) correctAnswer = 1
      text = `${a} - ${b} = ?`
      break
    case '*':
      // Multiplication: keep it simple for a 7-year-old
      // One number can be larger (up to 20) but the other should be small (1-10)
      a = randomNumber(1, 20)
      b = randomNumber(1, 10)
      correctAnswer = a * b
      text = `${a} × ${b} = ?`
      break
    default:
      a = randomNumber(1, 100)
      b = randomNumber(1, 20)
      correctAnswer = a + b
      text = `${a} + ${b} = ?`
  }

  // Generate 3 unique distractors
  const distractors: Set<number> = new Set()
  
  while (distractors.size < 3) {
    // Generate a distractor within a reasonable range of the correct answer
    // Ensure all distractors are positive numbers (at least 1)
    // For larger numbers, use a percentage-based range to keep distractors reasonable
    const range = Math.max(5, Math.floor(correctAnswer * 0.2)) // 20% of correct answer or at least 5
    const min = Math.max(1, correctAnswer - range)
    const max = correctAnswer + range
    const distractor = randomNumber(min, max)
    
    // Double check that the distractor is greater than 0
    if (distractor !== correctAnswer && distractor > 0) {
      distractors.add(distractor)
    }
  }

  // Create options array with correct answer and distractors
  const options = [...distractors, correctAnswer]
  
  // Final safety check: ensure no zeros in options
  const finalOptions = options.map(option => option === 0 ? 1 : option)
  
  // Shuffle the options
  finalOptions.sort(() => Math.random() - 0.5)
  
  // Find the index of the correct answer in the shuffled options
  const correctIndex = finalOptions.indexOf(correctAnswer)

  // If somehow correctAnswer is 0 (which shouldn't happen), fix it
  if (correctAnswer === 0) {
    correctAnswer = 1;
    finalOptions[correctIndex] = 1;
  }

  return { text, options: finalOptions, correctIndex }
}

/**
 * Generates an array of math questions
 */
export function generateQuestions(count: number): Question[] {
  const questions: Question[] = []
  for (let i = 0; i < count; i++) {
    const question = generateQuestion()
    
    // Final validation before adding to the array
    const hasZero = question.options.some(option => option === 0)
    if (hasZero) {
      // If somehow we still have a zero, regenerate the question
      i--; // Try again for this index
      continue;
    }
    
    questions.push(question)
  }
  return questions
} 