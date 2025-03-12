export interface Question {
  text: string
  options: number[]
  correctIndex: number
}

export interface AnswerRecord {
  questionText: string
  selected: number
  correct: number
  isCorrect: boolean
} 