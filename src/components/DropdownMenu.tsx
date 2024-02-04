import React, { useState, useRef, useContext, useEffect, ReactElement } from 'react'
import Button from '@/components/Button'
import useOutsideClick from '@/hooks/useOutsideClick'

import ChevronUp from '@/assets/svg/chevron-up.svg?react'
import ChevronDown from '@/assets/svg/chevron-down.svg?react'

interface DropdownMenuProps {
  children: React.ReactNode
  onSelect: (value: string) => void
  selected?: string
  setSelected?: (value: string) => void
}

interface DropdownContextType {
  selected?: string
  handleSelect?: (value: string) => void
}

const DropdownContext = React.createContext<DropdownContextType>({})

export default function DropdownMenu({
  children,
  onSelect,
  selected,
  setSelected: externalSetSelected
}: DropdownMenuProps) {
  const node = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const [isOpen, setIsOpen] = useState(false)
  const [internalSelected, internalSetSelected] = useState('')

  const isSelectedControlled = externalSetSelected !== undefined
  const currentSelected = isSelectedControlled ? selected : internalSelected
  const currentSetSelected = isSelectedControlled ? externalSetSelected : internalSetSelected

  const handleSelect = (value: string) => {
    if (currentSetSelected) {
      currentSetSelected(value)
    }
    onSelect(value)
    setIsOpen(false)
  }

  const handleOutsideClick = () => {
    setIsOpen(false)
  }

  useOutsideClick([buttonRef, node], handleOutsideClick)

  useEffect(() => {
    React.Children.forEach(children, (child) => {
      if (React.isValidElement<DropdownButtonProps | DropdownListProps>(child)) {
        if (child.type === DropdownMenu.Button) {
          currentSetSelected(child.props.children as string)
        } else if (child.type === DropdownMenu.List) {
          const listChild = React.Children.toArray(
            child.props.children
          ) as ReactElement<DropdownItemProps>[]
          const defaultItem = listChild.find((item) => item.props.isDefault)
          if (defaultItem) {
            currentSetSelected(defaultItem.props.children as string)
          }
        }
      }
    })
  }, [])

  return (
    <DropdownContext.Provider value={{ selected: currentSelected, handleSelect }}>
      <div className="relative cursor-pointer text-end" ref={node}>
        <Button
          className={`whitespace-nowrap hover:text-bg2 ${isOpen ? 'bg-text !text-bg2' : ''}`}
          format="sm"
          ref={buttonRef}
          onClick={() => setIsOpen(!isOpen)}>
          {currentSelected}
          <span className="ml-3xs">{isOpen ? <ChevronUp /> : <ChevronDown />}</span>
        </Button>
        {isOpen &&
          React.Children.map(children, (child) => {
            if (React.isValidElement(child) && child.type === DropdownMenu.List) {
              return React.cloneElement(child, {}, ...child.props.children)
            }
            return child
          })}
      </div>
    </DropdownContext.Provider>
  )
}

interface DropdownListProps {
  className?: string
  children: React.ReactNode
}

DropdownMenu.List = function DropdownList({ className, children }: DropdownListProps) {
  const { handleSelect } = useContext(DropdownContext)

  return (
    <ul className={className}>
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement<DropdownItemProps>(child) && child.type === DropdownMenu.Item) {
          // Combine optional item-specific onSelect with global handleSelect
          const combinedOnSelect = (value: string) => {
            child.props.onSelect && child.props.onSelect(value)
            handleSelect && handleSelect(value)
          }

          return React.cloneElement(child, {
            key: index,
            onSelect: combinedOnSelect // Pass the combined function
          })
        }
        return child
      })}
    </ul>
  )
}

interface DropdownItemProps {
  children: string
  onSelect?: (value: string) => void
  className?: string
  isDefault?: boolean
}

DropdownMenu.Item = function DropdownItem({ children, onSelect, className }: DropdownItemProps) {
  return (
    <li onClick={() => onSelect && onSelect(children)}>
      <Button className={className} format="sm">
        {children}
      </Button>
    </li>
  )
}

interface DropdownButtonProps {
  children: React.ReactNode
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
DropdownMenu.Button = function DropdownButton(_: DropdownButtonProps) {
  return <></>
}
