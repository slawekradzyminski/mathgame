import { useMathGame } from '../../hooks/MathGameProvider'
import './Summary.css'

export default function Summary() {
  const { score, answers, restartGame } = useMathGame()
  const totalQuestions = answers.length
  const percentage = Math.round((score / totalQuestions) * 100)
  
  let message = 'Try again!'
  if (percentage >= 80) {
    message = 'Excellent work!'
  } else if (percentage >= 60) {
    message = 'Good job!'
  } else if (percentage >= 40) {
    message = 'Nice effort!'
  }
  
  return (
    <div className="summary-container">
      <h2 className="summary-title">Game Summary</h2>
      
      <p className="summary-score">
        Your Score: <strong>{score}</strong> / {totalQuestions} ({percentage}%)
      </p>
      
      <h3 style={{ marginBottom: '1rem', color: percentage >= 60 ? '#2e7d32' : percentage >= 40 ? '#ff9800' : '#d32f2f' }}>
        {message}
      </h3>
      
      <div className="answers-list">
        {answers.map((answer, index) => (
          <div 
            key={index} 
            className={`answer-item ${answer.isCorrect ? 'correct' : 'wrong'}`}
            data-testid={`answer-item-${index}`}
          >
            <div className="question-text">{answer.questionText}</div>
            <div className={`user-answer ${answer.isCorrect ? 'correct' : 'wrong'}`}>
              Your answer: {answer.selected}
            </div>
            {!answer.isCorrect && (
              <div className="correct-answer">
                Correct answer: {answer.correct}
              </div>
            )}
          </div>
        ))}
      </div>
      
      <button 
        className="play-again-button" 
        onClick={restartGame}
        data-testid="play-again-button"
      >
        Play Again
      </button>
    </div>
  )
} 