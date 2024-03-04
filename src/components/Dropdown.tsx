import { useState, useRef, useEffect } from 'react'
import { Button } from './Button'
import { useOutsideClick } from '@/hooks/useOutsideClick'
import ChevronUp from '@/assets/svg/chevron-up.svg?react'
import ChevronDown from '@/assets/svg/chevron-down.svg?react'
import { twMerge } from 'tailwind-merge'

export interface PayloadType {
  label: string
  items: OptionItemType[]
}
type OptionItemType = {
  text: string
  value: string
}

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
  const [zIndex, setZIndex] = useState(0)

  useEffect(() => {
    if (isOpen) {
      setZIndex(1000)
    } else {
      setZIndex(50)
    }
  }, [isOpen])

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

      <div
        className={twMerge(
          'absolute left-1/2 z-50 mt-3xs flex max-h-64 origin-top -translate-x-[50%] flex-col  gap-3xs overflow-hidden whitespace-nowrap rounded-[2rem] bg-bar p-xs text-end font-btn text-sm shadow transition-transform duration-500',
          !isOpen ? 'scale-y-0' : ''
        )}
        style={{ zIndex: zIndex }}>
        <ul
          className={twMerge(
            'origin-bottom flex-col-reverse overflow-y-auto transition duration-500',
            !isOpen ? 'scale-y-[2]' : ''
          )}>
          {payload.items.map((item, index) => (
            <li className={twMerge('transition-transform duration-500')} key={item.text}>
              <Button
                className={twMerge(
                  'w-full justify-end border-transparent transition duration-500 hover:text-bar',
                  !isOpen ? 'opacity-0' : 'duration-0'
                )}
                format="sm"
                onClick={handleSelect(item.text, index, payload)}>
                {item.text}
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
