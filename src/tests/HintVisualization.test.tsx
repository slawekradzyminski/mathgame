import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import HintVisualization from '../components/HintVisualization'

describe('HintVisualization', () => {
  // given
  const additionProps = {
    operator: '+' as const,
    num1: 5,
    num2: 3
  }

  const subtractionProps = {
    operator: '-' as const,
    num1: 10,
    num2: 4
  }

  const multiplicationProps = {
    operator: '*' as const,
    num1: 6,
    num2: 3
  }

  test('renders addition hint correctly', () => {
    // when
    render(<HintVisualization {...additionProps} />)
    
    // then
    expect(screen.getByText("Let's add 5 and 3!")).toBeInTheDocument()
    expect(screen.getByText("5 circles:")).toBeInTheDocument()
    expect(screen.getByText("3 circles:")).toBeInTheDocument()
    expect(screen.getByText(/If we put them all together, we get/)).toBeInTheDocument()
    expect(screen.getByText("8", { exact: false })).toBeInTheDocument()
  })

  test('renders subtraction hint correctly', () => {
    // when
    render(<HintVisualization {...subtractionProps} />)
    
    // then
    expect(screen.getByText("Let's subtract 4 from 10!")).toBeInTheDocument()
    expect(screen.getByText("Imagine you start with 10 things:")).toBeInTheDocument()
    expect(screen.getByText("When you take away 4 (the red ones):")).toBeInTheDocument()
    expect(screen.getByText(/You have/)).toBeInTheDocument()
    expect(screen.getByText("6", { exact: false })).toBeInTheDocument()
  })

  test('renders multiplication hint correctly', () => {
    // when
    render(<HintVisualization {...multiplicationProps} />)
    
    // then
    expect(screen.getByText("Let's multiply 6 by 3!")).toBeInTheDocument()
    expect(screen.getByText(/Multiplying is like adding 6 together 3 times/)).toBeInTheDocument()
    expect(screen.getByText(/So, 6 × 3 =/)).toBeInTheDocument()
    expect(screen.getByText("18", { exact: false })).toBeInTheDocument()
  })
}) 