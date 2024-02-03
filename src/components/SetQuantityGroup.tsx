import Button from './Button'

interface SetQuantityGroupProps {
  quantity: number
  setQuantity: (quantity: number) => void
  min: number
  max: number
  className?: string
  classNameInput? : string,
  classNameButtons? : string,
}

export default function SetQuantityGroup({
  quantity,
  setQuantity,
  min,
  max,
  className,
  classNameInput,
  classNameButtons,

}: SetQuantityGroupProps) {
  return (
    <div className={`relative flex h-[calc(theme(spacing.lg)+theme(spacing.xs))] items-center justify-items-center ${className}`}>
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
    if (direction === 'plus' && quantity < limit) {
      setQuantity(Math.round(quantity + 1))
    } else if (direction === 'minus' && quantity > limit) {
      setQuantity(Math.round(quantity - 1))
    }
  }

  return (
    <Button
      format="round"
      className={`${direction === 'plus' ? 'mx-3xs' : 'mx-3xs'} ${className}`}
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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.round(Number(e.target.value))
    if (value < min) {
      setQuantity(min)
    } else if (value > max) {
      setQuantity(max)
    } else {
      setQuantity(value)
    }
  }

  return (
    <input
      className={`h-lg w-lg rounded-[2rem] bg-transparent text-center font-btn ${className}`}
      type="number"
      value={quantity.toString()}
      min={min}
      max={max}
      step="1"
      onChange={handleChange}
    />
  )
}
