import { Container, Typography, Box, Paper, LinearProgress } from '@mui/material'
import { useMathGame } from '../hooks/MathGameProvider'
import QuestionCard from '../components/QuestionCard/QuestionCard'
import Summary from '../components/Summary/Summary'

export default function GamePage() {
  const { currentIndex, score, isGameOver } = useMathGame()
  const QUESTION_COUNT = 10
  
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
          <Summary />
        </Box>
      </Container>
    )
  }

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
          <LinearProgress 
            variant="determinate" 
            value={(currentIndex / QUESTION_COUNT) * 100} 
            sx={{ 
              height: 10, 
              borderRadius: 5,
              mb: 4
            }} 
          />
        </Box>
        <Paper 
          elevation={3} 
          sx={{ 
            p: { xs: 3, sm: 5 }, 
            borderRadius: 4, 
            textAlign: 'center',
            background: 'linear-gradient(to bottom right, #ffffff, #f5f5f5)'
          }}
        >
          <QuestionCard />
        </Paper>
      </Box>
    </Container>
  )
} 