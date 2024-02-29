import { useState, useRef } from 'react'
import { Button } from './Button'
import { useOutsideClick } from '@/hooks/useOutsideClick'
import ChevronUp from '@/assets/svg/chevron-up.svg?react'
import ChevronDown from '@/assets/svg/chevron-down.svg?react'
import { twMerge } from 'tailwind-merge'

// Define a type for your payload
export interface PayloadType {
  label: string
  items: OptionItemType[]
}
type OptionItemType = {
  id: string
  option: string
}

// Define a type for your props
interface DropdownProps {
  payload: PayloadType
  placeholder: string
  onSelect: (index: number, payload: PayloadType) => void
}

export function Dropdown({ payload, placeholder, onSelect }: DropdownProps) {
  const node = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const [isOpen, setIsOpen] = useState(false)
  const [currentSelected, setCurrentSelected] = useState(placeholder)

  const handleSelect = (optionText: string, index: number, payload: PayloadType) => () => {
    setIsOpen(false)
    setCurrentSelected(optionText)
    onSelect(index, payload)
  }

  const handleOutsideClick = () => {
    setIsOpen(false)
  }

  useOutsideClick([buttonRef, node], handleOutsideClick)

  return (
    <div className="relative cursor-pointer text-end" ref={node}>
      <Button
        className={twMerge('whitespace-nowrap hover:text-bg2', isOpen ? 'bg-text text-bg2' : '')}
        format="sm"
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}>
        {currentSelected}
        <span className="ml-3xs">{isOpen ? <ChevronUp /> : <ChevronDown />}</span>
      </Button>
      {isOpen && (
        <ul className="absolute -right-2xs z-50 mt-3xs flex max-h-64 flex-col gap-3xs overflow-y-auto whitespace-nowrap rounded-[2rem] bg-bar p-xs text-end font-btn text-sm shadow">
          {payload.items.map((item, index) => (
            <li key={item.option}>
              <Button
                className="w-full justify-end border-transparent hover:text-bar"
                format="sm"
                onClick={handleSelect(item.option, index, payload)}>
                {item.option}
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
