import { Box, Typography } from '@mui/material'
import { OperatorHintProps } from '../../types/HintVisualization'
import { renderDots } from './utils'

export default function MultiplicationHint({ num1, num2, isMobile }: OperatorHintProps) {
  return (
    <Box 
      sx={{ 
        p: isMobile ? 1.5 : 2, 
        border: '2px dashed #81c784', 
        borderRadius: 2, 
        backgroundColor: '#e8f5e9',
        maxHeight: '70vh',
        display: 'flex',
        flexDirection: 'column'
      }}
      data-testid="hint-visualization"
    >
      <Box sx={{ mb: isMobile ? 1 : 2 }}>
        <Typography variant={isMobile ? "subtitle1" : "h6"} sx={{ mb: 1 }}>
          Let's multiply {num1} by {num2}!
        </Typography>
      </Box>
      
      <Box sx={{ 
        flex: 1, 
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
          width: '8px',
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: 'rgba(0,0,0,0.1)',
          borderRadius: '4px',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#81c784',
          borderRadius: '4px',
        }
      }}>
        <Typography variant="body1" sx={{ mb: isMobile ? 1 : 2 }}>
          Multiplying is like adding {num1} together {num2} times, or making {num2} groups of {num1}.
        </Typography>
        <Box sx={{ mt: isMobile ? 1 : 2, mb: 1 }}>
          {Array(num2).fill(0).map((_, groupIndex) => (
            <Box key={groupIndex} sx={{ mb: isMobile ? 1 : 2 }}>
              <Typography variant="body2" sx={{ mb: 0.5 }}>
                Group {groupIndex + 1}:
              </Typography>
              {renderDots(num1, 'green', undefined, isMobile)}
            </Box>
          ))}
        </Box>
        <Typography variant="body1">
          So, {num1} × {num2} = <b>{num1 * num2}</b>!
        </Typography>
      </Box>
    </Box>
  )
} 