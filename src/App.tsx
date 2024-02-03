import { useState } from 'react'
import Button from '@/components/Button'
import DropdownMenu from '@/components/DropdownMenu'
import SetQuantityGroup from '@/components/SetQuantityGroup'
//import { ReactComponent as ChevronUp } from '@/assets/svg/chevron-up.svg';
import ChevronUp from '@/assets/svg/chevron-up.svg?react';
import ChevronDown from '@/assets/svg/chevron-down.svg?react';
//import chevronUpUrl from '@/assets/svg/chevron-up.svg';

function App() {
  const [quantity, setQuantity] = useState(5)

  const sortOptions = ['Od A do Z', 'Od Z do A', 'Od najniższej ceny', 'Od najwyższej ceny']

  const handleSort = () => {
    return;
  }

  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center">
      <div className="flex flex-col text-green-300">Hello world</div>
      <input type="number" />
      <select name="exampleSelect" id="exampleSelect">
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
        <option value="option4">Option 4</option>
      </select>

      <DropdownMenu onSelect={handleSort}>
        <DropdownMenu.Button>Choose option</DropdownMenu.Button>
        <DropdownMenu.List
          className="absolute -right-2xs z-50 mt-3xs flex flex-col justify-center gap-3xs whitespace-nowrap rounded-[2rem] bg-bar
                  p-xs text-end font-btn text-sm shadow">
          {sortOptions.map((option, index) => (
            <DropdownMenu.Item
              key={index}
              className="!hover:bg-inherit w-full !justify-end border-transparent hover:text-bar">
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
