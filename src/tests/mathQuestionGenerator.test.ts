import { describe, test, expect } from 'vitest'
import { generateQuestion, generateQuestions } from '../utils/mathQuestionGenerator'

describe('mathQuestionGenerator', () => {
  test('generateQuestion should create a valid question', () => {
    // given
    const expectedProperties = ['text', 'options', 'correctIndex']
    
    // when
    const question = generateQuestion()
    
    // then
    expectedProperties.forEach(prop => {
      expect(question).toHaveProperty(prop)
    })
    
    expect(question.options).toHaveLength(4)
    expect(question.correctIndex).toBeGreaterThanOrEqual(0)
    expect(question.correctIndex).toBeLessThan(4)
    
    // Verify the correct answer is at the correct index
    const correctAnswer = question.options[question.correctIndex]
    
    // Extract numbers from the question text
    const matches = question.text.match(/(\d+)\s*([+\-×])\s*(\d+)\s*=\s*\?/)
    
    if (matches) {
      const [, a, operator, b] = matches
      const num1 = parseInt(a, 10)
      const num2 = parseInt(b, 10)
      
      let expected: number
      switch (operator) {
        case '+':
          expected = num1 + num2
          break
        case '-':
          expected = num1 - num2
          break
        case '×':
          expected = num1 * num2
          break
        default:
          expected = 0
      }
      
      expect(correctAnswer).toBe(expected)
    }
  })
  
  test('generateQuestions should create the specified number of questions', () => {
    // given
    const count = 10
    
    // when
    const questions = generateQuestions(count)
    
    // then
    expect(questions).toHaveLength(count)
    questions.forEach(question => {
      expect(question).toHaveProperty('text')
      expect(question).toHaveProperty('options')
      expect(question).toHaveProperty('correctIndex')
    })
  })
  
  test('generated questions should have unique distractors', () => {
    // given/when
    const question = generateQuestion()
    
    // then
    const uniqueOptions = new Set(question.options)
    expect(uniqueOptions.size).toBe(4)
  })
}) 