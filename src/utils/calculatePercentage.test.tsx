import { calculatePercentage } from './calculatePercentage'

describe('calculatePercentage', () => {
  it('calculates the percentage correctly', () => {
    expect(calculatePercentage(50, 100)).toBe(50)
    expect(calculatePercentage(75, 100)).toBe(75)
    expect(calculatePercentage(25, 100)).toBe(25)
  })

  it('handles edge cases', () => {
    expect(calculatePercentage(0, 0)).toBe(0)
    expect(calculatePercentage(1, 0)).toBe(0)
  })

  it('handles rounding correctly', () => {
    expect(calculatePercentage(1, 3)).toBe(33)
    expect(calculatePercentage(2, 3)).toBe(67)
  })

  it('handles negative inputs', () => {
    expect(calculatePercentage(-1, 10)).toBe(-10)
    expect(calculatePercentage(1, -10)).toBe(-10)
  })
})
