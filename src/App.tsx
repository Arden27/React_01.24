import { useState } from 'react'
import Button from '@/components/Button'
import DropdownMenu from '@/components/DropdownMenu'
import SetQuantityGroup from '@/components/SetQuantityGroup'

function App() {
  const [quantity, setQuantity] = useState(5)

  const sortOptions = ['Od A do Z', 'Od Z do A', 'Od najniższej ceny', 'Od najwyższej ceny']

  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center">
      <DropdownMenu onSelect={() => {}}>
        <DropdownMenu.Button>Choose option</DropdownMenu.Button>
        <DropdownMenu.List
          className="absolute -right-2xs z-50 mt-3xs flex flex-col justify-center gap-3xs whitespace-nowrap rounded-[2rem] bg-bar
                  p-xs text-end font-btn text-sm shadow">
          {sortOptions.map((option, index) => (
            <DropdownMenu.Item
              key={index}
              className="!hover:bg-inherit w-full !justify-end border-transparent hover:text-bar"
              onSelect={() => console.log('selected')}
            >
              {option}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.List>
      </DropdownMenu>

      <SetQuantityGroup
        quantity={quantity}
        setQuantity={setQuantity}
        min={5}
        max={15}
        className="rounded-[2rem] border-2 border-text bg-bg3"
        classNameButtons='text-lg my-3xs'
        classNameInput='text-lg'
      />

      <Button format="lg border">Start quiz</Button>
      <Button format="sm border">See my statistics</Button>
    </main>
  )
}

export default App
