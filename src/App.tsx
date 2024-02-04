import { useState } from 'react'
import Button from '@/components/Button'
import DropdownMenu from '@/components/DropdownMenu'
import SetQuantityGroup from '@/components/SetQuantityGroup'

function App() {
  const [quantity, setQuantity] = useState(5)

  const categoryOptions = [
    'Any Category',
    'General Knowledge',
    'Entertainment: Books',
    'Entertainment: Film',
    'Entertainment: Music',
    'Entertainment: Musicals & Theatres',
    'Entertainment: Television',
    'Entertainment: Video Games',
    'Entertainment: Board Games',
    'Science & Nature',
    'Science: Computers',
    'Science: Mathematics',
    'Mythology',
    'Sports',
    'Geography',
    'History',
    'Politics',
    'Art',
    'Celebrities',
    'Animals',
    'Vehicles',
    'Entertainment: Comics',
    'Science: Gadgets',
    'Entertainment: Japanese Anime & Manga',
    'Entertainment: Cartoon & Animations'
  ]

  const difficultyOptions = ['Any Difficulty', 'Easy', 'Medium', 'Hard']

  const typeOptions = ['Any Type', 'Multiple Choice', 'True / Flase']

  const timeOptions = ['1m', '2m', '5m']

  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center gap-2">
      <h1 className="text-2xl font-bold">Create Quiz</h1>

      <div className="flex items-center space-x-2">
        <h3 className="text-lg">with</h3>
        <SetQuantityGroup
          quantity={quantity}
          setQuantity={setQuantity}
          min={5}
          max={15}
          className="rounded-[2rem] border-2 border-text bg-bg3"
          classNameButtons="text-lg"
          classNameInput="text-lg"
        />
        <h3 className="text-lg">questions</h3>
      </div>

      <DropdownMenu onSelect={() => {}}>
        <DropdownMenu.Button>Choose Catgory</DropdownMenu.Button>
        <DropdownMenu.List
          className="absolute -right-2xs z-50 mt-3xs flex max-h-64 flex-col gap-3xs overflow-y-auto whitespace-nowrap
                  rounded-[2rem] bg-bar p-xs text-end font-btn text-sm shadow">
          {categoryOptions.map((option) => (
            <DropdownMenu.Item
              key={option}
              className="!hover:bg-inherit w-full !justify-end border-transparent hover:text-bar">
              {option}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.List>
      </DropdownMenu>

      <DropdownMenu onSelect={() => {}}>
        <DropdownMenu.Button>Choose Difficulty</DropdownMenu.Button>
        <DropdownMenu.List
          className="absolute -right-2xs z-50 mt-3xs flex flex-col justify-center gap-3xs whitespace-nowrap rounded-[2rem] bg-bar
                  p-xs text-end font-btn text-sm shadow">
          {difficultyOptions.map((option) => (
            <DropdownMenu.Item
              key={option}
              className="!hover:bg-inherit w-full !justify-end border-transparent hover:text-bar">
              {option}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.List>
      </DropdownMenu>

      <DropdownMenu onSelect={() => {}}>
        <DropdownMenu.Button>Choose Type</DropdownMenu.Button>
        <DropdownMenu.List
          className="absolute -right-2xs z-50 mt-3xs flex flex-col justify-center gap-3xs whitespace-nowrap rounded-[2rem] bg-bar
                  p-xs text-end font-btn text-sm shadow">
          {typeOptions.map((option) => (
            <DropdownMenu.Item
              key={option}
              className="!hover:bg-inherit w-full !justify-end border-transparent hover:text-bar">
              {option}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.List>
      </DropdownMenu>

      <DropdownMenu onSelect={() => {}}>
        <DropdownMenu.Button>Choose Time</DropdownMenu.Button>
        <DropdownMenu.List
          className="absolute -right-2xs z-50 mt-3xs flex flex-col justify-center gap-3xs whitespace-nowrap rounded-[2rem] bg-bar
                  p-xs text-end font-btn text-sm shadow">
          {timeOptions.map((option) => (
            <DropdownMenu.Item
              key={option}
              className="!hover:bg-inherit w-full !justify-end border-transparent hover:text-bar">
              {option}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.List>
      </DropdownMenu>

      <Button format="lg border fill">Start quiz</Button>
      <Button format="sm border" className="hover:bg-bg3 hover:text-text">
        See my statistics
      </Button>
    </main>
  )
}

export default App
