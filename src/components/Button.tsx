import React from 'react'
import { twMerge } from 'tailwind-merge'

function getButtonStyles(format: string): string {
  const types = format ? format.split(' ') : []

  let styles = ''

  if (types.includes('sm')) {
    styles += 'h-[calc(theme(spacing.lg)+theme(spacing.3xs))] p-xs '
  }

  if (types.includes('lg')) {
    styles += 'h-[calc(theme(spacing.lg)+theme(spacing.xs))]  px-sm '
  }

  if (types.includes('fill')) {
    styles += 'bg-text text-bg3 hover:text-header '
  }

  if (types.includes('round')) {
    styles +=
      'h-md w-sm justify-center rounded-[2rem] text-center font-btn leading-none hover:bg-text hover:text-bg3 '
  }

  if (types.includes('border')) {
    styles += 'border-2 border-solid border-text '
  }

  return styles.trim()
}

interface ButtonProps extends Omit<React.HTMLProps<HTMLButtonElement>, 'type'> {
  format: string
  className?: string
  children: React.ReactNode
  type?: 'submit' | 'reset' | 'button'
}

function ButtonComponent(
  { format, className, children, ...props }: ButtonProps,
  ref: React.Ref<HTMLButtonElement>
) {
  const buttonStyles = getButtonStyles(format)

  return (
    <button
      ref={ref}
      className={twMerge(
        'relative flex items-center justify-center rounded-[2rem] font-btn text-sm uppercase text-text transition-colors duration-300 ease-in-out hover:bg-text hover:text-header active:top-[2px] active:opacity-90 ',
        buttonStyles,
        className
      )}
      {...props}>
      {children}
    </button>
  )
}

const Button = React.forwardRef(ButtonComponent)
export { Button }
