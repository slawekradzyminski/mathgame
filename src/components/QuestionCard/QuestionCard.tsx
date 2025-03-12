import { useState } from 'react'
import { Question } from '../../types/Question'
import { useMathGame } from '../../hooks/MathGameProvider'
import HintVisualization from '../HintVisualization'
import './QuestionCard.css'

export default function QuestionCard() {
  const { questions, currentIndex, handleAnswerSelect } = useMathGame()
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [showHint, setShowHint] = useState(false)
  
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
      
      <div className="hint-container">
        <button 
          className="hint-button"
          onClick={() => setShowHint(!showHint)}
          data-testid="hint-button"
        >
          {showHint ? "Hide Hint" : "Show Hint"}
        </button>
      </div>
      
      {showHint && (
        <div className="hint-visualization-container" data-testid="hint-container">
          <HintVisualization 
            operator={currentQuestion.operator} 
            num1={currentQuestion.num1} 
            num2={currentQuestion.num2} 
          />
        </div>
      )}
      
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