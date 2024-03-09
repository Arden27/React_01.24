import { formatTime } from './formatTime'

describe('formatTime', () => {
  it('formats seconds correctly', () => {
    expect(formatTime(90)).toBe('01:30')
    expect(formatTime(45)).toBe('00:45')
    expect(formatTime(120)).toBe('02:00')
    expect(formatTime(3599)).toBe('59:59')
  })

  it('handles edge cases', () => {
    expect(formatTime(0)).toBe('00:00')
    expect(formatTime(59)).toBe('00:59')
    expect(formatTime(60)).toBe('01:00')
  })

  it('handles large numbers of seconds', () => {
    expect(formatTime(3661)).toBe('61:01')
  })

  it('handles negative seconds', () => {
    expect(formatTime(-90)).toBe('-01:30')
  })
})
