import { useState } from 'react'
import menuOptions from '@/data/menuOptions'
import Button from '@/components/Button'
import DropdownMenu from '@/components/DropdownMenu'
import SetQuantityGroup from '@/components/SetQuantityGroup'

export default function CreateQuizScreen() {
  const [quantity, setQuantity] = useState(5)

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

      {menuOptions.map((option) => (
        <DropdownMenu onSelect={() => {}}>
          <DropdownMenu.Button>{option.label}</DropdownMenu.Button>
          <DropdownMenu.List
            className="absolute -right-2xs z-50 mt-3xs flex max-h-64 flex-col gap-3xs overflow-y-auto whitespace-nowrap
                  rounded-[2rem] bg-bar p-xs text-end font-btn text-sm shadow">
            {option.items.map((item) => (
              <DropdownMenu.Item
                key={item}
                className="!hover:bg-inherit w-full !justify-end border-transparent hover:text-bar">
                {item}
              </DropdownMenu.Item>
            ))}
          </DropdownMenu.List>
        </DropdownMenu>
      ))}

      <Button format="lg border fill">Start quiz</Button>
      <Button format="sm border">See my statistics</Button>
    </main>
  )
}
