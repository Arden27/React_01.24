import React, { useState, useRef, useContext, useEffect, ReactElement } from 'react'
import { Button } from '@/components/Button'
import { useOutsideClick } from '@/hooks/useOutsideClick'

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

export function DropdownMenu({
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

  const [initialValueSet, setInitialValueSet] = useState(false)

  useEffect(() => {
    if (initialValueSet) {
      return // Skip the effect if the initial value is already set
    }
    let labelSet = false
    let defaultItemFound = false

    React.Children.forEach(children, (child) => {
      if (React.isValidElement<DropdownPlaceholderProps | DropdownListProps>(child)) {
        if (child.type === DropdownMenu.Placeholder) {
          currentSetSelected(child.props.children as string)
          labelSet = true
        } else if (child.type === DropdownMenu.List) {
          const listChild = React.Children.toArray(
            child.props.children
          ) as ReactElement<DropdownItemProps>[]

          // Check for default item
          const defaultItem = listChild.find((item) => item.props.isDefault)
          if (defaultItem) {
            currentSetSelected(defaultItem.props.children as string)
            defaultItemFound = true
          } else if (!labelSet && !defaultItemFound && listChild.length > 0) {
            // Fallback to first item if no default and no label
            currentSetSelected(listChild[0].props.children as string)
          }
        }
      }
    })
    setInitialValueSet(true) // Mark the
  }, [children, currentSetSelected, initialValueSet])

  return (
    <DropdownContext.Provider value={{ selected: currentSelected, handleSelect }}>
      <div className="relative cursor-pointer text-end" ref={node}>
        <Button
          className={`whitespace-nowrap hover:text-bg2 ${isOpen ? 'bg-text text-bg2' : ''}`}
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
  isDefault?: boolean
  className?: string
}

DropdownMenu.Item = function DropdownItem({
  children,
  onSelect,
  isDefault,
  className
}: DropdownItemProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dummy = isDefault
  return (
    <li onClick={() => onSelect && onSelect(children)}>
      <Button className={className} format="sm">
        {children}
      </Button>
    </li>
  )
}

interface DropdownPlaceholderProps {
  children: React.ReactNode
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
DropdownMenu.Placeholder = function DropdownPlaceholder(_: DropdownPlaceholderProps) {
  return <></>
}
