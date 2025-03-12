import { Box } from '@mui/material'

export const renderDots = (count: number, color: string, remainingCount?: number, isMobile = false) => {
  const rows = Math.ceil(count / 10)
  const dotSize = isMobile ? 16 : 20
  const gap = isMobile ? '2px' : '4px'
  
  return Array(rows).fill(0).map((_, rowIndex) => {
    const dotsInThisRow = rowIndex === rows - 1 ? count % 10 || 10 : 10
    return (
      <Box key={rowIndex} sx={{ display: 'flex', gap, mb: isMobile ? 0.5 : 1 }}>
        {Array(dotsInThisRow).fill(0).map((_, i) => {
          const dotIndex = rowIndex * 10 + i
          const isRemaining = remainingCount !== undefined ? dotIndex < remainingCount : true
          return (
            <Box 
              key={i}
              sx={{ 
                width: dotSize,
                height: dotSize,
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