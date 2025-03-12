import { useTheme, useMediaQuery } from '@mui/material'
import { HintVisualizationProps } from '../types/HintVisualization'
import AdditionHint from './hints/AdditionHint'
import SubtractionHint from './hints/SubtractionHint'
import MultiplicationHint from './hints/MultiplicationHint'

export default function HintVisualization({ operator, num1, num2 }: HintVisualizationProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  if (operator === '+') {
    return <AdditionHint num1={num1} num2={num2} isMobile={isMobile} />
  } else if (operator === '-') {
    return <SubtractionHint num1={num1} num2={num2} isMobile={isMobile} />
  } else {
    // operator === '*'
    return <MultiplicationHint num1={num1} num2={num2} isMobile={isMobile} />
  }
} 