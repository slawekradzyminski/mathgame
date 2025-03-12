import { useState } from 'react'
import { CardContent, Typography, Button, Stack, Box, Paper } from '@mui/material'
import { Question } from '../types/Question'
import HintVisualization from './HintVisualization'

interface QuestionCardProps {
  question: Question
  onAnswerSelect: (selected: number) => void
}

export default function QuestionCard({ question, onAnswerSelect }: QuestionCardProps) {
  const { num1, num2, operator, options } = question
  const [showHint, setShowHint] = useState(false)

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        borderRadius: 4, 
        overflow: 'hidden',
        background: 'linear-gradient(to bottom right, #ffffff, #f5f5f5)',
        width: '100%',
        maxWidth: '100%'
      }}
    >
      <Box 
        sx={{ 
          p: { xs: 4, sm: 6 }, 
          textAlign: 'center',
          background: 'linear-gradient(to right, #2196f3, #64b5f6)',
          color: 'white'
        }}
      >
        <Typography 
          variant="h2" 
          sx={{ 
            fontWeight: 'bold',
            fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' }
          }}
        >
          {num1} {operator === '*' ? '×' : operator} {num2} = ?
        </Typography>
      </Box>
      <CardContent sx={{ p: { xs: 3, sm: 5 }, textAlign: 'center' }}>
        <Box sx={{ mb: 3 }}>
          <Button 
            variant="outlined"
            onClick={() => setShowHint(!showHint)}
            data-testid="hint-button"
            sx={{ 
              fontWeight: 'bold'
            }}
          >
            {showHint ? "Hide Hint" : "Show Hint"}
          </Button>
        </Box>

        {showHint && (
          <Box sx={{ mb: 3 }}>
            <HintVisualization operator={operator} num1={num1} num2={num2} />
          </Box>
        )}

        <Stack spacing={3}>
          {options.map((option, index) => (
            <Button
              key={index}
              variant="contained"
              size="large"
              fullWidth
              onClick={() => onAnswerSelect(option)}
              sx={{ 
                py: 2,
                fontSize: { xs: '1.2rem', sm: '1.5rem' },
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: '0 6px 10px rgba(0, 0, 0, 0.15)'
                }
              }}
            >
              {option}
            </Button>
          ))}
        </Stack>
      </CardContent>
    </Paper>
  )
} 