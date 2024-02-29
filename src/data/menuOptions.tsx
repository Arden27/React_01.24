const menuOptions = [
  {
    label: 'difficulty',
    items: [
      { option: 'Any Difficulty', id: 'any' },
      { option: 'Easy', id: 'easy' },
      { option: 'Medium', id: 'medium' },
      { option: 'Hard', id: 'hard' }
    ]
  },
  {
    label: 'type',
    items: [
      { option: 'Any Type', id: 'any' },
      { option: 'Multiple Choice', id: 'multiple' },
      { option: 'True / False', id: 'boolean' }
    ]
  },
  {
    label: 'time',
    items: [
      { option: '1m', id: '1' },
      { option: '2m', id: '2' },
      { option: '5m', id: '5' }
    ]
  }
]

export default menuOptions
