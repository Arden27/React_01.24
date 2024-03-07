import { shuffleArray } from './shuffleArray'

describe('shuffleArray', () => {
  it('preserves the length of the array', () => {
    const array = ['a', 'b', 'c', 'd']
    const shuffled = shuffleArray([...array])
    expect(shuffled.length).toBe(array.length)
  })

  it('contains the same elements after shuffling', () => {
    const array = ['a', 'b', 'c', 'd']
    const shuffled = shuffleArray([...array])
    expect(shuffled.sort()).toEqual(array.sort())
  })

  it('returns a different order for most shuffles', () => {
    const array = ['a', 'b', 'c', 'd']
    let isDifferent = false
    const original = [...array].toString()
    for (let i = 0; i < 10; i++) {
      const shuffled = shuffleArray([...array]).toString()
      if (shuffled !== original) {
        isDifferent = true
        break
      }
    }
    expect(isDifferent).toBe(true)
  })
})
