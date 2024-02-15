import { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { Button } from './Button';

interface SetQuantityGroupProps {
  min: number;
  max: number;
  step?: number; // New step property
  className?: string;
  classNameInput?: string;
  classNameButtons?: string;
  initialState?: number; // Changed type from any to number
  setExternalQuantity?: Dispatch<SetStateAction<number>>;
}

export function SetQuantityGroup({
  min,
  max,
  step = 1, // Default value for step
  className,
  classNameInput,
  classNameButtons,
  initialState,
  setExternalQuantity
}: SetQuantityGroupProps) {
  const [quantity, setQuantity] = useState(initialState || min);

  useEffect(() => {
    if (setExternalQuantity) {
      setExternalQuantity(quantity);
    }
  }, [quantity, setExternalQuantity]);

  return (
    <div
      className={`relative flex h-[calc(theme(spacing.lg)+theme(spacing.xs))] items-center justify-items-center ${className}`}>
      <SetQuantityButton
        quantity={quantity}
        setQuantity={setQuantity}
        direction="minus"
        limit={min}
        step={step}
        className={classNameButtons}
      />

      <InputQuantity
        quantity={quantity}
        setQuantity={setQuantity}
        min={min}
        max={max}
        step={step}
        className={classNameInput}
      />

      <SetQuantityButton
        quantity={quantity}
        setQuantity={setQuantity}
        direction="plus"
        limit={max}
        step={step}
        className={classNameButtons}
      />
    </div>
  );
}

interface SetQuantityButtonProps {
  quantity: number;
  setQuantity: (quantity: number) => void;
  direction: 'plus' | 'minus';
  limit: number;
  step: number; // New step property
  className?: string;
}

function SetQuantityButton({
  quantity,
  setQuantity,
  direction,
  limit,
  step,
  className
}: SetQuantityButtonProps) {
  const handleClick = () => {
    if (direction === 'plus' && quantity < limit) {
      setQuantity(quantity + step);
    } else if (direction === 'minus' && quantity > limit) {
      setQuantity(quantity - step);
    }
  };

  return (
    <Button
      format="round"
      className={`${direction === 'plus' ? 'mx-3xs' : 'mx-3xs'} ${className}`}
      onClick={handleClick}>
      {direction === 'plus' ? '+' : '-'}
    </Button>
  );
}

interface InputQuantityProps {
  quantity: number;
  setQuantity: (quantity: number) => void;
  min: number;
  max: number;
  step: number; // New step property
  className?: string;
}

function InputQuantity({ quantity, setQuantity, min, max, step, className }: InputQuantityProps) {
  const [inputValue, setInputValue] = useState(quantity.toString());

  const handleBlur = () => {
    let value = parseFloat(inputValue) || min; // Changed fallback to min if NaN
    if (value < min) {
      value = min;
    } else if (value > max) {
      value = max;
    }
    setQuantity(value);
    setInputValue(value.toString());
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };

  useEffect(() => {
    setInputValue(quantity.toString());
  }, [quantity]);

  return (
    <input
      className={`h-lg w-lg rounded-[2rem] bg-transparent text-center font-btn ${className}`}
      type="number"
      value={inputValue}
      min={min}
      max={max}
      step={step}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  );
}
