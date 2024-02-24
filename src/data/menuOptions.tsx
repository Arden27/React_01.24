const menuOptions = [
  {
    label: 'difficulty',
    items: [
      { name: 'Any Difficulty', id: 'any' },
      { name: 'Easy', id: 'easy' },
      { name: 'Medium', id: 'medium' },
      { name: 'Hard', id: 'hard' }
    ]
  },
  {
    label: 'type',
    items: [
      { name: 'Any Type', id: 'any' },
      { name: 'Multiple Choice', id: 'multiple' },
      { name: 'True / False', id: 'boolean' }
    ]
  },
  {
    label: 'time',
    items: [
      { name: '1m', id: '1' },
      { name: '2m', id: '2' },
      { name: '5m', id: '5' }
    ]
  }
]

export default menuOptions
