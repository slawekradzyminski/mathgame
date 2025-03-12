import { Box, Typography } from '@mui/material'

interface HintVisualizationProps {
  operator: '+' | '-' | '*'
  num1: number
  num2: number
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
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Box>
            <Typography variant="body1">{num1} circles:</Typography>
            <Box sx={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
              {Array(num1).fill(0).map((_, i) => (
                <Box key={i} 
                     sx={{ width: 20, height: 20, borderRadius: '50%', backgroundColor: 'red' }} 
                />
              ))}
            </Box>
          </Box>
          <Box>
            <Typography variant="body1">{num2} circles:</Typography>
            <Box sx={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
              {Array(num2).fill(0).map((_, i) => (
                <Box key={i} 
                     sx={{ width: 20, height: 20, borderRadius: '50%', backgroundColor: 'blue' }} 
                />
              ))}
            </Box>
          </Box>
        </Box>
        <Typography variant="body1" sx={{ mt: 1 }}>
          If we put them all together, we get <b>{num1 + num2}</b> circles in total!
        </Typography>
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
        <Box sx={{ display: 'flex', gap: '4px', flexWrap: 'wrap', my: 1 }}>
          {Array(num1).fill(0).map((_, i) => (
            <Box key={i} 
                 sx={{ 
                   width: 20, 
                   height: 20, 
                   borderRadius: '50%', 
                   backgroundColor: i < num1 - num2 ? 'green' : 'red',
                   border: '1px solid #ccc'
                 }} 
            />
          ))}
        </Box>
        <Typography variant="body1">
          When you take away {num2} (the red ones):
        </Typography>
        <Box sx={{ display: 'flex', gap: '4px', flexWrap: 'wrap', my: 1 }}>
          {Array(num1 - num2).fill(0).map((_, i) => (
            <Box key={i} 
                 sx={{ 
                   width: 20, 
                   height: 20, 
                   borderRadius: '50%', 
                   backgroundColor: 'green',
                   border: '1px solid #ccc'
                 }} 
            />
          ))}
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
            <Box key={groupIndex} sx={{ display: 'flex', gap: '4px', flexWrap: 'wrap', mb: 1 }}>
              {Array(num1).fill(0).map((_, i) => (
                <Box key={i}
                     sx={{ 
                       width: 20, 
                       height: 20, 
                       borderRadius: '50%', 
                       backgroundColor: 'green',
                       border: '1px solid #ccc'
                     }} 
                />
              ))}
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