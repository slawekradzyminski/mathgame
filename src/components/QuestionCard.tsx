import { CardContent, Typography, Button, Stack, Box, Paper } from '@mui/material'
import { Question } from '../types/Question'

interface QuestionCardProps {
  question: Question
  onAnswerSelect: (selected: number) => void
}

export default function QuestionCard({ question, onAnswerSelect }: QuestionCardProps) {
  const { num1, num2, options } = question

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        borderRadius: 4, 
        overflow: 'hidden',
        background: 'linear-gradient(to bottom right, #ffffff, #f5f5f5)',
        width: '100%'
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
          {num1} + {num2} = ?
        </Typography>
      </Box>
      <CardContent sx={{ p: { xs: 3, sm: 5 } }}>
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