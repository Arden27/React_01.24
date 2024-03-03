import { useEffect, useState } from 'react'
import { Button } from './Button'
import { twMerge } from 'tailwind-merge'

interface SetQuantityGroupProps {
  min: number
  max: number
  onChange?: (quantity: number) => void
  className?: string
  classNameInput?: string
  classNameButtons?: string
}

export function SetQuantityGroup({
  min,
  max,
  onChange,
  className,
  classNameInput,
  classNameButtons
}: SetQuantityGroupProps) {
  const [quantity, setInternalQuantity] = useState(min)

  const setQuantity = (newQuantity: number) => {
    setInternalQuantity(newQuantity)
    onChange?.(newQuantity)
  }

  return (
    <div
      className={twMerge(
        `relative flex h-[calc(theme(spacing.lg)+theme(spacing.xs))] items-center justify-items-center`,
        className
      )}>
      <SetQuantityButton
        quantity={quantity}
        setQuantity={setQuantity}
        direction="minus"
        limit={min}
        className={classNameButtons}
      />
      <InputQuantity
        quantity={quantity}
        setQuantity={setQuantity}
        min={min}
        max={max}
        className={classNameInput}
      />
      <SetQuantityButton
        quantity={quantity}
        setQuantity={setQuantity}
        direction="plus"
        limit={max}
        className={classNameButtons}
      />
    </div>
  )
}

interface SetQuantityButtonProps {
  quantity: number
  setQuantity: (quantity: number) => void
  direction: 'plus' | 'minus'
  limit: number
  className?: string
}

function SetQuantityButton({
  quantity,
  setQuantity,
  direction,
  limit,
  className
}: SetQuantityButtonProps) {
  const handleClick = () => {
    let newQuantity = quantity
    if (direction === 'plus' && quantity < limit) {
      newQuantity = Math.round(quantity + 1)
    } else if (direction === 'minus' && quantity > limit) {
      newQuantity = Math.round(quantity - 1)
    }
    setQuantity(newQuantity)
  }

  return (
    <Button
      format="round"
      className={twMerge(direction === 'plus' ? 'mx-3xs' : 'mx-3xs', className)}
      onClick={handleClick}>
      {direction === 'plus' ? '+' : '-'}
    </Button>
  )
}

interface InputQuantityProps {
  quantity: number
  setQuantity: (quantity: number) => void
  min: number
  max: number
  className?: string
}

function InputQuantity({ quantity, setQuantity, min, max, className }: InputQuantityProps) {
  const [inputValue, setInputValue] = useState(quantity.toString())

  const handleBlur = () => {
    let value = parseFloat(inputValue) || 0
    if (value < min) {
      value = min
    } else if (value > max) {
      value = max
    }
    setQuantity(value)
    setInputValue(value.toString())
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  useEffect(() => {
    setInputValue(quantity.toString())
  }, [quantity])

  return (
    <input
      className={twMerge(`h-lg w-lg rounded-[2rem] bg-transparent text-center font-btn`, className)}
      type="number"
      value={inputValue}
      min={min}
      max={max}
      step="1"
      onChange={handleChange}
      onBlur={handleBlur}
    />
  )
}
