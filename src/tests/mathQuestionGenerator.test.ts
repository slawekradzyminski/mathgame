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
  
  test('subtraction questions should never have negative results', () => {
    // given
    let foundSubtractionQuestion = false
    let attempts = 0
    const maxAttempts = 100
    
    // when/then
    while (!foundSubtractionQuestion && attempts < maxAttempts) {
      const question = generateQuestion()
      const matches = question.text.match(/(\d+)\s*-\s*(\d+)\s*=\s*\?/)
      
      if (matches) {
        foundSubtractionQuestion = true
        const [, a, b] = matches
        const num1 = parseInt(a, 10)
        const num2 = parseInt(b, 10)
        const result = num1 - num2
        
        expect(result).toBeGreaterThanOrEqual(0)
        expect(num1).toBeGreaterThanOrEqual(num2)
      }
      
      attempts++
    }
    
    // If we didn't find a subtraction question after many attempts, skip this test
    if (!foundSubtractionQuestion) {
      console.log('No subtraction question generated in test attempts, skipping test')
    }
  })
  
  test('all options should be positive numbers', () => {
    // given/when
    // Generate a larger set of questions to increase test coverage
    const questions = generateQuestions(20)
    
    // then
    let allPositive = true;
    let nonPositiveFound = null;
    
    questions.forEach(question => {
      question.options.forEach(option => {
        if (option <= 0) {
          allPositive = false;
          nonPositiveFound = option;
        }
        expect(option).toBeGreaterThan(0);
      });
    });
    
    // Additional assertion with detailed error message
    if (!allPositive) {
      throw new Error(`Found non-positive option: ${nonPositiveFound}`);
    }
    
    // Direct test of the generateQuestion function
    for (let i = 0; i < 50; i++) {
      const question = generateQuestion();
      question.options.forEach(option => {
        expect(option).toBeGreaterThan(0);
      });
    }
  })
  
  test('multiplication questions should use appropriate numbers for 7-year-olds', () => {
    // given
    let foundMultiplicationQuestion = false
    let attempts = 0
    const maxAttempts = 100
    
    // when/then
    while (!foundMultiplicationQuestion && attempts < maxAttempts) {
      const question = generateQuestion()
      const matches = question.text.match(/(\d+)\s*×\s*(\d+)\s*=\s*\?/)
      
      if (matches) {
        foundMultiplicationQuestion = true
        const [, a, b] = matches
        const num1 = parseInt(a, 10)
        const num2 = parseInt(b, 10)
        
        // One number can be up to 20, but the other should be 10 or less
        expect(Math.min(num1, num2)).toBeLessThanOrEqual(10)
        expect(Math.max(num1, num2)).toBeLessThanOrEqual(20)
      }
      
      attempts++
    }
    
    // If we didn't find a multiplication question after many attempts, skip this test
    if (!foundMultiplicationQuestion) {
      console.log('No multiplication question generated in test attempts, skipping test')
    }
  })
  
  test('addition questions should use numbers up to 100', () => {
    // given
    let foundAdditionQuestion = false
    let attempts = 0
    const maxAttempts = 100
    
    // when/then
    while (!foundAdditionQuestion && attempts < maxAttempts) {
      const question = generateQuestion()
      const matches = question.text.match(/(\d+)\s*\+\s*(\d+)\s*=\s*\?/)
      
      if (matches) {
        foundAdditionQuestion = true
        const [, a, b] = matches
        const num1 = parseInt(a, 10)
        const num2 = parseInt(b, 10)
        
        // Both numbers can be up to 100
        expect(num1).toBeGreaterThanOrEqual(1)
        expect(num1).toBeLessThanOrEqual(100)
        expect(num2).toBeGreaterThanOrEqual(1)
        expect(num2).toBeLessThanOrEqual(100)
      }
      
      attempts++
    }
    
    // If we didn't find an addition question after many attempts, skip this test
    if (!foundAdditionQuestion) {
      console.log('No addition question generated in test attempts, skipping test')
    }
  })
  
  test('subtraction questions should use numbers up to 100', () => {
    // given
    let foundSubtractionQuestion = false
    let attempts = 0
    const maxAttempts = 100
    
    // when/then
    while (!foundSubtractionQuestion && attempts < maxAttempts) {
      const question = generateQuestion()
      const matches = question.text.match(/(\d+)\s*-\s*(\d+)\s*=\s*\?/)
      
      if (matches) {
        foundSubtractionQuestion = true
        const [, a, b] = matches
        const num1 = parseInt(a, 10)
        const num2 = parseInt(b, 10)
        
        // Both numbers can be up to 100, but first must be >= second
        expect(num1).toBeGreaterThanOrEqual(10)
        expect(num1).toBeLessThanOrEqual(100)
        expect(num2).toBeGreaterThanOrEqual(1)
        expect(num2).toBeLessThanOrEqual(100)
        expect(num2).toBeLessThanOrEqual(num1)
      }
      
      attempts++
    }
    
    // If we didn't find a subtraction question after many attempts, skip this test
    if (!foundSubtractionQuestion) {
      console.log('No subtraction question generated in test attempts, skipping test')
    }
  })
}) 