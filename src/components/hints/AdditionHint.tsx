import { Box, Typography } from '@mui/material'
import { OperatorHintProps } from '../../types/HintVisualization'
import { renderDots } from './utils'

export default function AdditionHint({ num1, num2, isMobile }: OperatorHintProps) {
  return (
    <Box 
      sx={{
        p: isMobile ? 1.5 : 2, 
        border: '2px dashed #64b5f6', 
        borderRadius: 2, 
        backgroundColor: '#e3f2fd',
        maxHeight: '70vh',
        display: 'flex',
        flexDirection: 'column'
      }}
      data-testid="hint-visualization"
    >
      <Box sx={{ mb: isMobile ? 1 : 2 }}>
        <Typography variant={isMobile ? "subtitle1" : "h6"} sx={{ mb: 1 }}>
          Let's add {num1} and {num2}!
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
          backgroundColor: '#64b5f6',
          borderRadius: '4px',
        }
      }}>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? 2 : 4, 
          mb: 3 
        }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body1" sx={{ mb: 1 }}>{num1} circles:</Typography>
            {renderDots(num1, 'red', undefined, isMobile)}
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body1" sx={{ mb: 1 }}>{num2} circles:</Typography>
            {renderDots(num2, 'blue', undefined, isMobile)}
          </Box>
        </Box>
        <Typography variant="body1" sx={{ mb: 2 }}>
          If we put them all together, we get <b>X</b> circles in total!
        </Typography>
        {!isMobile && (
          <Box sx={{ mt: 2, p: 2, backgroundColor: 'rgba(255, 255, 255, 0.5)', borderRadius: 1 }}>
            <Typography variant="body2" sx={{ mb: 1 }}>All circles together:</Typography>
            {Array(Math.ceil((num1 + num2) / 10)).fill(0).map((_, rowIndex) => {
              const dotsInThisRow = rowIndex === Math.ceil((num1 + num2) / 10) - 1 
                ? (num1 + num2) % 10 || 10 
                : 10
              return (
                <Box key={rowIndex} sx={{ display: 'flex', gap: '4px', mb: 1 }}>
                  {Array(dotsInThisRow).fill(0).map((_, i) => {
                    const dotIndex = rowIndex * 10 + i
                    return (
                      <Box 
                        key={i}
                        sx={{ 
                          width: 20, 
                          height: 20, 
                          borderRadius: '50%', 
                          backgroundColor: dotIndex < num1 ? 'red' : 'blue',
                          border: '1px solid #ccc'
                        }}
                      />
                    )
                  })}
                </Box>
              )
            })}
          </Box>
        )}
      </Box>
    </Box>
  )
} 