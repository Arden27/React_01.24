import { useState, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface FlipperProps {
  front: ReactNode
  back: ReactNode
  className?: string
  animation?: string
}

export function Flipper({ front, back, className, animation }: FlipperProps) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div className={twMerge('relative', className)} style={{ perspective: '1000px' }}>
      <div
        className={twMerge(
          'absolute transform transition-transform duration-1000',
          flipped ? animation : 'rotate-reset'
        )}
        style={{ transformStyle: 'preserve-3d' }}>
        <div
          className="absolute flex h-full w-full items-center justify-center"
          style={{ backfaceVisibility: 'hidden' }}
          onClick={() => setFlipped(!flipped)}>
          {front}
        </div>
        <div
          className={twMerge(
            'absolute flex h-full w-full transform items-center justify-center',
            animation
          )}
          style={{ backfaceVisibility: 'hidden' }}
          onClick={() => setFlipped(!flipped)}>
          {back}
        </div>
      </div>
    </div>
  )
}
