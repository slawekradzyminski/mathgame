import { Box, Typography, Button, CircularProgress } from '@mui/material'
import { useState, useEffect } from 'react'

interface SummaryProps {
  score: number
  questionCount: number
  onPlayAgain: () => void
}

export default function Summary({ score, questionCount, onPlayAgain }: SummaryProps) {
  const [progress, setProgress] = useState(0)
  const percentage = Math.round((score / questionCount) * 100)
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(percentage)
    }, 100)
    
    return () => clearTimeout(timer)
  }, [percentage])
  
  let message = 'Try again!'
  if (percentage >= 80) {
    message = 'Excellent work!'
  } else if (percentage >= 60) {
    message = 'Good job!'
  } else if (percentage >= 40) {
    message = 'Nice effort!'
  }
  
  return (
    <Box sx={{ textAlign: 'center', width: '100%' }}>
      <Typography 
        variant="h3" 
        gutterBottom 
        sx={{ 
          color: 'primary.main', 
          fontWeight: 'bold',
          fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
        }}
      >
        Game Over!
      </Typography>
      
      <Box sx={{ position: 'relative', display: 'inline-flex', my: 4 }}>
        <CircularProgress
          variant="determinate"
          value={progress}
          size={160}
          thickness={5}
          sx={{ color: percentage >= 60 ? 'success.main' : percentage >= 40 ? 'warning.main' : 'error.main' }}
        />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography 
            variant="h4" 
            component="div" 
            color="text.secondary"
            sx={{ fontWeight: 'bold' }}
          >
            {`${percentage}%`}
          </Typography>
        </Box>
      </Box>
      
      <Typography 
        variant="h5" 
        gutterBottom
        sx={{ 
          mb: 2,
          color: percentage >= 60 ? 'success.main' : percentage >= 40 ? 'warning.main' : 'error.main',
          fontWeight: 'bold'
        }}
      >
        {message}
      </Typography>
      
      <Typography 
        variant="h6" 
        gutterBottom 
        sx={{ 
          mb: 4, 
          fontSize: { xs: '1.1rem', sm: '1.3rem' }
        }}
      >
        Your score: <strong>{score}</strong> / {questionCount}
      </Typography>
      
      <Button 
        variant="contained" 
        onClick={onPlayAgain}
        size="large"
        sx={{ 
          px: 6,
          py: 1.5,
          fontSize: { xs: '1.1rem', sm: '1.3rem' },
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'scale(1.05)',
            boxShadow: '0 6px 10px rgba(0, 0, 0, 0.15)'
          }
        }}
      >
        Play Again
      </Button>
    </Box>
  )
} 