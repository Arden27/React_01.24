import { useState } from 'react'
import SetQuantityGroup from '@/components/SetQuantityGroup'
import Button from '@/components/Button'

function App() {
  const [quantity, setQuantity] = useState(5)

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

      <SetQuantityGroup
        quantity={quantity}
        setQuantity={setQuantity}
        min={5}
        max={15}
        className="relative flex h-[calc(theme(spacing.lg)+theme(spacing.xs))] items-center justify-items-center rounded-[2rem] border-2 border-text bg-bg3"
      />

      <Button format="lg border">Start quiz</Button>
      <Button format="sm border">See my statistics</Button>
      <Button format='round border'>+</Button>
    </main>
  )
}

export default App
