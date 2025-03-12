import { Box, Typography } from '@mui/material'

interface HintVisualizationProps {
  operator: '+' | '-' | '*'
  num1: number
  num2: number
}

// Helper function to split dots into rows of 10
const renderDots = (count: number, color: string, remainingCount?: number) => {
  const rows = Math.ceil(count / 10)
  return Array(rows).fill(0).map((_, rowIndex) => {
    const dotsInThisRow = rowIndex === rows - 1 ? count % 10 || 10 : 10
    return (
      <Box key={rowIndex} sx={{ display: 'flex', gap: '4px', mb: 1 }}>
        {Array(dotsInThisRow).fill(0).map((_, i) => {
          const dotIndex = rowIndex * 10 + i
          const isRemaining = remainingCount !== undefined ? dotIndex < remainingCount : true
          return (
            <Box 
              key={i}
              sx={{ 
                width: 20, 
                height: 20, 
                borderRadius: '50%', 
                backgroundColor: isRemaining ? color : 'red',
                border: '1px solid #ccc'
              }}
            />
          )
        })}
      </Box>
    )
  })
}

export default function HintVisualization({ operator, num1, num2 }: HintVisualizationProps) {
  if (operator === '+') {
    return (
      <Box 
        sx={{
          p: 2, 
          border: '2px dashed #64b5f6', 
          borderRadius: 2, 
          backgroundColor: '#e3f2fd'
        }}
        data-testid="hint-visualization"
      >
        <Typography variant="h6" sx={{ mb: 1 }}>
          Let's add {num1} and {num2}!
        </Typography>
        <Box sx={{ display: 'flex', gap: 4, mb: 3 }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body1" sx={{ mb: 1 }}>{num1} circles:</Typography>
            {renderDots(num1, 'red')}
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body1" sx={{ mb: 1 }}>{num2} circles:</Typography>
            {renderDots(num2, 'blue')}
          </Box>
        </Box>
        <Typography variant="body1" sx={{ mb: 2 }}>
          If we put them all together, we get <b>{num1 + num2}</b> circles in total!
        </Typography>
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
      </Box>
    )
  } else if (operator === '-') {
    return (
      <Box 
        sx={{ 
          p: 2, 
          border: '2px dashed #ffb74d', 
          borderRadius: 2, 
          backgroundColor: '#fff8e1' 
        }}
        data-testid="hint-visualization"
      >
        <Typography variant="h6" sx={{ mb: 1 }}>
          Let's subtract {num2} from {num1}!
        </Typography>
        <Typography variant="body1">
          Imagine you start with {num1} things:
        </Typography>
        <Box sx={{ my: 1 }}>
          {renderDots(num1, 'green', num1 - num2)}
        </Box>
        <Typography variant="body1">
          When you take away {num2} (the red ones):
        </Typography>
        <Box sx={{ my: 1 }}>
          {renderDots(num1 - num2, 'green')}
        </Box>
        <Typography variant="body1">
          You have <b>{num1 - num2}</b> left!
        </Typography>
      </Box>
    )
  } else {
    // operator === '*'
    return (
      <Box 
        sx={{ 
          p: 2, 
          border: '2px dashed #81c784', 
          borderRadius: 2, 
          backgroundColor: '#e8f5e9' 
        }}
        data-testid="hint-visualization"
      >
        <Typography variant="h6" sx={{ mb: 1 }}>
          Let's multiply {num1} by {num2}!
        </Typography>
        <Typography variant="body1">
          Multiplying is like adding {num1} together {num2} times, or making {num2} groups of {num1}.
        </Typography>
        <Box sx={{ mt: 2, mb: 1 }}>
          {Array(num2).fill(0).map((_, groupIndex) => (
            <Box key={groupIndex} sx={{ mb: 2 }}>
              <Typography variant="body2" sx={{ mb: 0.5 }}>
                Group {groupIndex + 1}:
              </Typography>
              {renderDots(num1, 'green')}
            </Box>
          ))}
        </Box>
        <Typography variant="body1">
          So, {num1} × {num2} = <b>{num1 * num2}</b>!
        </Typography>
      </Box>
    )
  }
} 