import { describe, test, expect, vi, beforeEach } from 'vitest'
import { generateQuestion, generateQuestions } from '../utils/mathQuestionGenerator'

describe('mathQuestionGenerator', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('generateQuestion', () => {
    test('generates a valid question with required properties', () => {
      // given/when
      const question = generateQuestion()
      
      // then
      expect(question).toHaveProperty('text')
      expect(question).toHaveProperty('options')
      expect(question).toHaveProperty('correctIndex')
      expect(question).toHaveProperty('num1')
      expect(question).toHaveProperty('num2')
      expect(question).toHaveProperty('operator')
      expect(question.options).toHaveLength(4)
      expect(['*', '+', '-']).toContain(question.operator)
      
      // Verify the correct answer is at the correct index
      const correctAnswer = question.options[question.correctIndex]
      
      // Check that the correct answer matches the operation
      let expectedAnswer: number
      switch (question.operator) {
        case '+':
          expectedAnswer = question.num1 + question.num2
          break
        case '-':
          expectedAnswer = question.num1 - question.num2
          break
        case '*':
          expectedAnswer = question.num1 * question.num2
          break
        default:
          expectedAnswer = 0
      }
      
      expect(correctAnswer).toBe(expectedAnswer)
    })
    
    test('ensures no zero values in options', () => {
      // given/when
      // Generate multiple questions to increase test coverage
      const questions = []
      for (let i = 0; i < 10; i++) {
        questions.push(generateQuestion())
      }
      
      // then
      questions.forEach(question => {
        expect(question.options.every(option => option > 0)).toBe(true)
      })
    })

    test('ensures no duplicate options', () => {
      // given/when
      const question = generateQuestion()

      // then
      const uniqueOptions = new Set(question.options)
      expect(uniqueOptions.size).toBe(4)
    })
    
    test('subtraction questions should never have negative results', () => {
      // given/when
      // Generate multiple questions to find subtraction questions
      const questions = []
      for (let i = 0; i < 20; i++) {
        questions.push(generateQuestion())
      }
      
      // then
      const subtractionQuestions = questions.filter(q => q.operator === '-')
      
      // If we found any subtraction questions, verify they don't have negative results
      if (subtractionQuestions.length > 0) {
        subtractionQuestions.forEach(question => {
          expect(question.num1).toBeGreaterThanOrEqual(question.num2)
          expect(question.num1 - question.num2).toBeGreaterThan(0)
        })
      }
    })
    
    test('multiplication questions use appropriate numbers for 7-year-olds', () => {
      // given/when
      // Generate multiple questions to find multiplication questions
      const questions = []
      for (let i = 0; i < 20; i++) {
        questions.push(generateQuestion())
      }
      
      // then
      const multiplicationQuestions = questions.filter(q => q.operator === '*')
      
      // If we found any multiplication questions, verify they use appropriate numbers
      if (multiplicationQuestions.length > 0) {
        multiplicationQuestions.forEach(question => {
          // One number should be 10 or less
          expect(Math.min(question.num1, question.num2)).toBeLessThanOrEqual(10)
        })
      }
    })
  })

  describe('generateQuestions', () => {
    test('generates the requested number of questions', () => {
      // given/when
      const questions = generateQuestions(5)

      // then
      expect(questions).toHaveLength(5)
    })

    test('each question has the required properties', () => {
      // given/when
      const questions = generateQuestions(3)

      // then
      questions.forEach(question => {
        expect(question).toHaveProperty('text')
        expect(question).toHaveProperty('options')
        expect(question).toHaveProperty('correctIndex')
        expect(question).toHaveProperty('num1')
        expect(question).toHaveProperty('num2')
        expect(question).toHaveProperty('operator')
        expect(question.options).toHaveLength(4)
        expect(typeof question.correctIndex).toBe('number')
        expect(['*', '+', '-']).toContain(question.operator)
      })
    })

    test('ensures no zero values in options', () => {
      // given/when
      const questions = generateQuestions(10)
      
      // then
      questions.forEach(question => {
        expect(question.options.every(option => option > 0)).toBe(true)
      })
    })
  })
}) 