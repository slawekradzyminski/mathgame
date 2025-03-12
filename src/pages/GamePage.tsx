import { Container, Typography, Box, Paper, Grid } from '@mui/material'
import { useMathGame } from '../hooks/useMathGame'
import QuestionCard from '../components/QuestionCard'
import Summary from '../components/Summary'

const QUESTION_COUNT = 10
const MAX_RANGE = 100

export default function GamePage() {
  const {
    questions,
    currentIndex,
    score,
    isGameOver,
    handleAnswerSelect,
    restartGame
  } = useMathGame(QUESTION_COUNT, MAX_RANGE)

  if (isGameOver) {
    return (
      <Container 
        maxWidth="md" 
        sx={{ 
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          py: 4
        }}
      >
        <Box
          data-testid="content-container"
          sx={{
            width: '100%',
            maxWidth: '800px'
          }}
        >
          <Paper 
            elevation={3} 
            sx={{ 
              p: { xs: 3, sm: 5 }, 
              borderRadius: 4, 
              textAlign: 'center',
              background: 'linear-gradient(to bottom right, #ffffff, #f5f5f5)'
            }}
          >
            <Summary
              score={score}
              questionCount={QUESTION_COUNT}
              onPlayAgain={restartGame}
            />
          </Paper>
        </Box>
      </Container>
    )
  }

  const currentQuestion = questions[currentIndex]

  return (
    <Container 
      maxWidth="md" 
      sx={{ 
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        py: 4
      }}
    >
      <Box
        data-testid="content-container"
        sx={{
          width: '100%',
          maxWidth: '800px'
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            Math Game
          </Typography>
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              mb: 3
            }}
          >
            <Typography variant="h6">
              Question {currentIndex + 1} of {QUESTION_COUNT}
            </Typography>
            <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
              Score: {score}
            </Typography>
          </Box>
          <Box 
            sx={{ 
              width: '100%', 
              height: 12, 
              bgcolor: 'grey.200', 
              borderRadius: 6, 
              mb: 4 
            }}
          >
            <Box 
              sx={{ 
                width: `${((currentIndex) / QUESTION_COUNT) * 100}%`, 
                height: '100%', 
                bgcolor: 'primary.main', 
                borderRadius: 6,
                transition: 'width 0.3s ease-in-out'
              }} 
            />
          </Box>
        </Box>
        <QuestionCard
          question={currentQuestion}
          onAnswerSelect={handleAnswerSelect}
        />
      </Box>
    </Container>
  )
} 