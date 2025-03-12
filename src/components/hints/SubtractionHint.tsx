import { Box, Typography } from '@mui/material'
import { OperatorHintProps } from '../../types/HintVisualization'
import { renderDots } from './utils'

export default function SubtractionHint({ num1, num2, isMobile }: OperatorHintProps) {
  return (
    <Box 
      sx={{ 
        p: isMobile ? 1.5 : 2, 
        border: '2px dashed #ffb74d', 
        borderRadius: 2, 
        backgroundColor: '#fff8e1',
        maxHeight: '70vh',
        display: 'flex',
        flexDirection: 'column'
      }}
      data-testid="hint-visualization"
    >
      <Box sx={{ mb: isMobile ? 1 : 2 }}>
        <Typography variant={isMobile ? "subtitle1" : "h6"} sx={{ mb: 1 }}>
          Let's subtract {num2} from {num1}!
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
          backgroundColor: '#ffb74d',
          borderRadius: '4px',
        }
      }}>
        <Typography variant="body1">
          Imagine you start with {num1} things:
        </Typography>
        <Box sx={{ my: isMobile ? 0.5 : 1 }}>
          {renderDots(num1, 'green', num1 - num2, isMobile)}
        </Box>
        <Typography variant="body1">
          When you take away {num2} (the red ones):
        </Typography>
        <Box sx={{ my: isMobile ? 0.5 : 1 }}>
          {renderDots(num1 - num2, 'green', undefined, isMobile)}
        </Box>
        <Typography variant="body1">
          You have <b>{num1 - num2}</b> left!
        </Typography>
      </Box>
    </Box>
  )
} 