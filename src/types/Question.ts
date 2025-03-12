export interface Question {
  text: string
  options: number[]
  correctIndex: number
  num1: number
  num2: number
  operator: '+' | '-' | '*'
}

export interface AnswerRecord {
  questionText: string
  selected: number
  correct: number
  isCorrect: boolean
} 