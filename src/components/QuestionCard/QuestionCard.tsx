import { useState } from 'react'
import { Question } from '../../types/Question'
import { useMathGame } from '../../hooks/MathGameProvider'
import './QuestionCard.css'

export default function QuestionCard() {
  const { questions, currentIndex, handleAnswerSelect } = useMathGame()
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  
  const currentQuestion = questions[currentIndex]
  
  const handleClick = (option: number, index: number) => {
    if (selectedIndex !== null) return
    
    setSelectedIndex(index)
    setSelectedOption(option)
    
    // Wait 2 seconds before moving to the next question
    setTimeout(() => {
      handleAnswerSelect(option)
      setSelectedIndex(null)
      setSelectedOption(null)
    }, 2000)
  }
  
  return (
    <div className="question-card">
      <h2 className="question-text">
        {currentQuestion.text}
      </h2>
      <div className="answers-container">
        {currentQuestion.options.map((option, index) => {
          let className = "answer-button"
          
          if (selectedIndex !== null) {
            if (index === currentQuestion.correctIndex) {
              className += " correct"
            } else if (index === selectedIndex && index !== currentQuestion.correctIndex) {
              className += " wrong"
            } else {
              className += " disabled"
            }
          }
          
          return (
            <button
              key={index}
              className={className}
              onClick={() => handleClick(option, index)}
              disabled={selectedIndex !== null}
              data-testid={`answer-${index}`}
            >
              {option}
            </button>
          )
        })}
      </div>
    </div>
  )
} 